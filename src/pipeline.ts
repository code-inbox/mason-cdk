import { Stage } from 'aws-cdk-lib';
import { EnvironmentPlaceholders } from 'aws-cdk-lib/cx-api';
import {
  AddStageOpts,
  PipelineBase,
  ShellStep,
  StackAsset,
  StackDeployment,
  StackOutputReference,
  StageDeployment,
  Step,
} from 'aws-cdk-lib/pipelines';
import {
  AGraphNode,
  Graph,
  isGraph,
  PipelineGraph,
} from 'aws-cdk-lib/pipelines/lib/helpers-internal';
import {
  AwsCredentials,
  AwsCredentialsProvider,
  ContainerOptions,
  DockerCredential,
  GitHubActionStep,
  Job as GitHubJob,
  GitHubWorkflowProps,
  JobPermission,
  JobSettings,
  JobStep,
  JobStepOutput,
  JobSettings as OriginalJobSettings,
  WorkflowTriggers,
  YamlFile,
} from 'cdk-pipelines-github';
import { GitHubCommonProps } from 'cdk-pipelines-github/lib/github-common';
import * as github from 'cdk-pipelines-github/lib/workflows-model';
import { Construct } from 'constructs';
import * as decamelize from 'decamelize';
import * as diff from 'diff';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const CDKOUT_ARTIFACT = 'cdk.out';
const ASSET_HASH_NAME = 'asset-hash';
const SHA_STRING =
    "${{ github.event_name == 'workflow_run' && github.event.workflow_run.head_sha ||  github.sha  }}";
const CACHE_PREFIX =
    "${{ github.event_name == 'workflow_run' && '-production-' ||  ''}}";

export interface ExtendedJobSettings extends OriginalJobSettings {
  /**
     * Timeout in minutes after which this job will be canceled if it hasn't finished.
     */
  readonly timeoutMinutes?: number;
}

export interface IMasonNamer {
  /**
     * Use this function to set the display name of stack deployment jobs. By default, the name of the job will be the
     * name of the stack. Sometimes we may want the name to be different. For example, if the stack name is dynamic but
     * the pipeline code should remain static.
     *
     * This will be used for stack delpoyment job names and its display name.
     *
     * @return string stack display name or undefined for default
     */
  stackDisplayName(
    originalName: string,
    stack: StackDeployment,
  ): string | undefined;

  /**
     * Use this function to override deployed stack names. This is useful when the stack name is dynamic but the pipeline
     * code should remain static.
     *
     * @return string stack name or undefined for default
     */
  stackName(originalName: string, stack: StackDeployment): string | undefined;

  /**
     * Use this function to override GitHub Actions job names. This is useful when the job name is dynamic but the
     * pipeline code should remain static.
     *
     * @return string job name or undefined for default
     */
  gitHubActionJobName(originalName: string, step: Step): string | undefined;
}

export interface MasonGitHubWorkflowProps extends GitHubWorkflowProps {
  /**
     * Additional job level settings that will be applied to all jobs in the workflow,
     * including synth and asset deploy jobs. Currently, the only valid setting
     * is 'timeoutMinutes'. You can use this to run jobs only in specific repositories.
     *
     * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository
     */
  readonly extendedJobSettings?: ExtendedJobSettings;

  /**
     * Optional object that can name jobs and stacks. This can be useful to avoid name conflicts.
     */
  readonly namer?: IMasonNamer;
}

export interface MasonAddGitHubStageOptions
  extends AddStageOpts,
  GitHubCommonProps {
  /**
     * Additional job level settings that will be applied to all jobs in the workflow,
     * including synth and asset deploy jobs. Currently, the only valid setting
     * is 'timeoutMinutes'. You can use this to run jobs only in specific repositories.
     *
     * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository
     */
  readonly extendedJobSettings?: ExtendedJobSettings;
}

/**
 * CDK Pipelines for GitHub workflows.
 */
export class MasonGitHubWorkflow extends PipelineBase {
  public readonly workflowPath: string;
  public readonly workflowName: string;
  public readonly workflowFile: YamlFile;
  public readonly awsCredentials: AwsCredentialsProvider;
  public readonly publishAssetsAuthRegion: string;

  private readonly workflowTriggers: WorkflowTriggers;
  private readonly preSynthed: boolean;
  private readonly dockerCredentials: DockerCredential[];
  private readonly cdkCliVersion?: string;
  private readonly buildContainer?: ContainerOptions;
  private readonly preBuildSteps: JobStep[];
  private readonly postBuildSteps: JobStep[];
  private readonly jobOutputs: Record<string, JobStepOutput[]> = {};
  private readonly assetHashMap: Record<string, string> = {};
  private readonly runner: github.Runner;
  private readonly stackProperties: Record<string, Record<string, any>> = {};
  private readonly jobSettings?: JobSettings;
  private readonly extendedJobSettings?: ExtendedJobSettings;
  private readonly namer?: IMasonNamer;

  constructor(scope: Construct, id: string, props: MasonGitHubWorkflowProps) {
    super(scope, id, props);

    this.cdkCliVersion = props.cdkCliVersion;
    this.preSynthed = props.preSynthed ?? false;
    this.buildContainer = props.buildContainer;
    this.preBuildSteps = props.preBuildSteps ?? [];
    this.postBuildSteps = props.postBuildSteps ?? [];
    this.jobSettings = props.jobSettings;
    this.extendedJobSettings = props.extendedJobSettings;

    this.awsCredentials = this.getAwsCredentials(props);

    this.dockerCredentials = props.dockerCredentials ?? [];

    this.workflowPath =
            props.workflowPath ?? '.github/workflows/deploy.yml';
    if (
      !this.workflowPath.endsWith('.yml') &&
            !this.workflowPath.endsWith('.yaml')
    ) {
      throw new Error('workflow file is expected to be a yaml file');
    }
    if (!this.workflowPath.includes('.github/workflows/')) {
      throw new Error(
        "workflow files must be stored in the '.github/workflows' directory of your repository",
      );
    }

    this.workflowFile = new YamlFile(this.workflowPath);
    this.workflowName = props.workflowName ?? 'deploy';
    this.workflowTriggers = props.workflowTriggers ?? {
      push: { branches: ['main'] },
      workflowDispatch: {},
    };

    this.runner = props.runner ?? github.Runner.UBUNTU_LATEST;
    this.publishAssetsAuthRegion =
            props.publishAssetsAuthRegion ?? 'us-west-2';

    this.namer = props.namer;
  }

  /**
     * Parse AWS credential configuration from deprecated properties For backwards compatibility.
     */
  private getAwsCredentials(props: MasonGitHubWorkflowProps) {
    if (props.gitHubActionRoleArn) {
      if (props.awsCreds) {
        throw new Error(
          'Please provide only one method of authentication (remove githubActionRoleArn)',
        );
      }
      return AwsCredentials.fromOpenIdConnect({
        gitHubActionRoleArn: props.gitHubActionRoleArn,
      });
    }

    if (props.awsCredentials) {
      if (props.awsCreds) {
        throw new Error(
          'Please provide only one method of authentication (remove awsCredentials)',
        );
      }
      return AwsCredentials.fromGitHubSecrets({
        accessKeyId: 'AWS_ACCESS_KEY_ID',
        secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
        ...props.awsCredentials,
      });
    }

    return props.awsCreds ?? AwsCredentials.fromGitHubSecrets();
  }

  /**
     * Deploy a single Stage by itself with options for further GitHub configuration.
     *
     * Add a Stage to the pipeline, to be deployed in sequence with other Stages added to the pipeline.
     * All Stacks in the stage will be deployed in an order automatically determined by their relative dependencies.
     */
  public addStageWithGitHubOptions(
    stage: Stage,
    options?: MasonAddGitHubStageOptions,
  ): StageDeployment {
    const stageDeployment = this.addStage(stage, options);

    // keep track of GitHub specific options
    const stacks = stageDeployment.stacks;
    this.addStackProps(stacks, 'environment', options?.gitHubEnvironment);
    this.addStackProps(stacks, 'capabilities', options?.stackCapabilities);
    this.addStackProps(stacks, 'settings', {
      ...options?.jobSettings,
      ...options?.extendedJobSettings,
    });

    return stageDeployment;
  }

  private addStackProps(stacks: StackDeployment[], key: string, value: any) {
    if (value === undefined) {
      return;
    }
    for (const stack of stacks) {
      this.stackProperties[stack.stackArtifactId] = {
        ...this.stackProperties[stack.stackArtifactId],
        [key]: value,
      };
    }
  }

  protected doBuildPipeline() {
    const app = Stage.of(this);
    if (!app) {
      throw new Error(
        'The GitHub Workflow must be defined in the scope of an App',
      );
    }
    const cdkoutDir = app.outdir;

    const jobs = new Array<Job>();

    const structure = new PipelineGraph(this, {
      selfMutation: false,
      publishTemplate: true,
      prepareStep: false, // we create and execute the changeset in a single job
    });

    for (const stageNode of flatten(structure.graph.sortedChildren())) {
      if (!isGraph(stageNode)) {
        throw new Error(
          `Top-level children must be graphs, got '${stageNode}'`,
        );
      }

      const tranches = stageNode.sortedLeaves();

      for (const tranche of tranches) {
        for (const node of tranche) {
          const job = this.jobForNode(node, {
            assemblyDir: cdkoutDir,
            structure,
          });

          if (job) {
            jobs.push(job);
          }
        }
      }
    }

    // convert jobs to a map and make sure there are no duplicates
    const jobmap: Record<string, GitHubJob> = {};
    for (const job of jobs) {
      if (job.id in jobmap) {
        throw new Error(`duplicate job id ${job.id}`);
      }
      jobmap[job.id] = snakeCaseKeys(job.definition);
    }

    // Update jobs with late-bound output requests
    this.insertJobOutputs(jobmap);

    const workflow = {
      name: this.workflowName,
      on: snakeCaseKeys(this.workflowTriggers, '_'),
      jobs: jobmap,
    };

    // write as a yaml file
    this.workflowFile.update(workflow);

    // create directory if it does not exist
    mkdirSync(path.dirname(this.workflowPath), { recursive: true });

    // GITHUB_WORKFLOW is set when GitHub Actions is running the workflow.
    // see: https://docs.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
    const contextValue = this.node.tryGetContext(
      'cdk-pipelines-github:diffProtection',
    );
    const diffProtection =
            contextValue === 'false' ? false : (contextValue ?? true);
    if (
      diffProtection &&
            process.env.GITHUB_WORKFLOW === this.workflowName
    ) {
      if (
        !existsSync(this.workflowPath) ||
                this.workflowFile.toYaml() !==
                    readFileSync(this.workflowPath, 'utf8')
      ) {
        // eslint-disable-next-line no-console
        console.log(
          diff.diffLines(
            readFileSync(this.workflowPath, 'utf8'),
            this.workflowFile.toYaml(),
            {
              newlineIsToken: false,
            },
          ),
        );
        throw new Error(
          `Please commit the updated workflow file ${path.relative(
            __dirname,
            this.workflowPath,
          )} when you change your pipeline definition.`,
        );
      }
    }

    this.workflowFile.writeFile();
  }

  private insertJobOutputs(jobmap: Record<string, GitHubJob>) {
    for (const [jobId, jobOutputs] of Object.entries(this.jobOutputs)) {
      jobmap[jobId] = {
        ...jobmap[jobId],
        outputs: {
          ...jobmap[jobId].outputs,
          ...this.renderJobOutputs(jobOutputs),
        },
      };
    }
  }

  private renderJobOutputs(outputs: JobStepOutput[]) {
    const renderedOutputs: Record<string, string> = {};
    for (const output of outputs) {
      renderedOutputs[output.outputName] =
                `\${{ steps.${output.stepId}.outputs.${output.outputName} }}`;
    }
    return renderedOutputs;
  }

  /**
     * Make an action from the given node and/or step
     */
  private jobForNode(node: AGraphNode, options: Context): Job | undefined {
    switch (node.data?.type) {
      // Nothing for these, they are groupings (shouldn't even have popped up here)
      case 'group':
      case 'stack-group':
      case undefined:
        throw new Error(
          `jobForNode: did not expect to get group nodes: ${node.data?.type}`,
        );

      case 'self-update':
        throw new Error(
          'GitHub Workflows does not support self mutation',
        );

      case 'publish-assets':
        return this.jobForAssetPublish(node, node.data.assets, options);

      case 'prepare':
        throw new Error(
          '"prepare" is not supported by GitHub Workflows',
        );

      case 'execute':
        return this.jobForDeploy(
          node,
          node.data.stack,
          node.data.captureOutputs,
        );

      case 'step':
        if (node.data.isBuildStep) {
          return this.jobForBuildStep(node, node.data.step);
        } else if (node.data.step instanceof ShellStep) {
          return this.jobForScriptStep(node, node.data.step);
        } else if (node.data.step instanceof GitHubActionStep) {
          return this.jobForGitHubActionStep(node, node.data.step);
        } else {
          throw new Error(
            `unsupported step type: ${node.data.step.constructor.name}`,
          );
        }

      default:
        // The 'as any' is temporary, until the change upstream rolls out
        throw new Error(
          `GitHubWorfklow does not support graph nodes of type '${
            (node.data as any)?.type
          }'. You are probably using a feature this CDK Pipelines implementation does not support.`,
        );
    }
  }

  private jobForAssetPublish(
    node: AGraphNode,
    assets: StackAsset[],
    options: Context,
  ): Job {
    if (assets.length === 0) {
      throw new Error('Asset Publish step must have at least 1 asset');
    }

    const installSuffix = this.cdkCliVersion
      ? `@${this.cdkCliVersion}`
      : '';
    const cdkoutDir = options.assemblyDir;
    const jobId = node.uniqueId;
    const assetId = assets[0].assetId;

    // check if asset is docker asset and if we have docker credentials
    const dockerLoginSteps: JobStep[] = [];
    if (
      node.uniqueId.includes('DockerAsset') &&
            this.dockerCredentials.length > 0
    ) {
      for (const creds of this.dockerCredentials) {
        dockerLoginSteps.push(...this.stepsToConfigureDocker(creds));
      }
    }

    // create one file and make one step
    const relativeToAssembly = (p: string) =>
      path.posix.join(
        cdkoutDir,
        path.relative(path.resolve(cdkoutDir), p),
      );
    const fileContents: string[] = ['set -ex'].concat(
      assets.map((asset) => {
        return `npx cdk-assets --path "${relativeToAssembly(
          asset.assetManifestPath,
        )}" --verbose publish "${asset.assetSelector}"`;
      }),
    );

    // we need the jobId to reference the outputs later
    this.assetHashMap[assetId] = jobId;
    fileContents.push(
      `echo '::set-output name=${ASSET_HASH_NAME}::${assetId}'`,
    );

    const publishStepFile = path.join(
      cdkoutDir,
      `publish-${jobId}-step.sh`,
    );
    mkdirSync(path.dirname(publishStepFile), { recursive: true });
    writeFileSync(publishStepFile, fileContents.join('\n'), {
      encoding: 'utf-8',
    });

    const publishStep: JobStep = {
      id: 'Publish',
      name: `Publish ${jobId}`,
      run: `/bin/bash ./cdk.out/$GITHUB_REF_NAME/${path.relative(
        cdkoutDir,
        publishStepFile,
      )}`,
    };

    return {
      id: jobId,
      definition: {
        name: `Publish Assets ${jobId}`,
        ...this.jobSettings,
        ...this.extendedJobSettings,
        needs: this.renderDependencies(node),
        permissions: {
          contents: JobPermission.READ,
          pullRequests: JobPermission.WRITE,
          idToken: this.awsCredentials.jobPermission(),
        },
        runsOn: this.runner.runsOn,
        container: this.buildContainer,
        outputs: {
          [ASSET_HASH_NAME]: `\${{ steps.Publish.outputs.${ASSET_HASH_NAME} }}`,
        },
        steps: [
          ...this.stepsToDownloadAssembly(CDKOUT_ARTIFACT),
          {
            name: 'Install',
            run: `npm install --no-save cdk-assets${installSuffix}`,
          },
          ...this.stepsToConfigureAws(this.publishAssetsAuthRegion),
          ...dockerLoginSteps,
          publishStep,
        ],
      },
    };
  }

  private jobForDeploy(
    node: AGraphNode,
    stack: StackDeployment,
    _captureOutputs: boolean,
  ): Job {
    const region = stack.region;
    const account = stack.account;
    if (!region || !account) {
      throw new Error('"account" and "region" are required');
    }

    if (!stack.templateUrl) {
      throw new Error(
        `unable to determine template URL for stack ${stack.stackArtifactId}`,
      );
    }

    const resolve = (s: string): string => {
      return EnvironmentPlaceholders.replace(s, {
        accountId: account,
        region: region,
        partition: 'aws',
      });
    };

    const replaceAssetHash = (template: string) => {
      const hash = path.parse(template.split('/').pop() ?? '').name;
      if (this.assetHashMap[hash] === undefined) {
        throw new Error(`Template asset hash ${hash} not found.`);
      }
      return template.replace(
        hash,
        `\${{ needs.${this.assetHashMap[hash]}.outputs.${ASSET_HASH_NAME} }}`,
      );
    };

    const params: Record<string, any> = {
      'name':
                this.namer?.stackName(stack.stackName, stack) ??
                stack.stackName,
      'template': replaceAssetHash(resolve(stack.templateUrl)),
      'no-fail-on-empty-changeset': '1',
    };

    const capabilities =
            this.stackProperties[stack.stackArtifactId]?.capabilities;
    if (capabilities) {
      params.capabilities = Array(capabilities).join(',');
    }

    if (stack.executionRoleArn) {
      params['role-arn'] = resolve(stack.executionRoleArn);
    }
    const assumeRoleArn = stack.assumeRoleArn
      ? resolve(stack.assumeRoleArn)
      : undefined;

    return {
      id: this.namer?.stackDisplayName(node.uniqueId, stack)
        ? `${this.namer?.stackDisplayName(node.uniqueId, stack)}-Deploy`
        : node.uniqueId,
      definition: {
        name: `Deploy ${
          this.namer?.stackDisplayName(node.uniqueId, stack) ??
                    node.uniqueId
        }`,
        ...this.jobSettings,
        ...this.extendedJobSettings,
        ...this.stackProperties[stack.stackArtifactId]?.settings,
        permissions: {
          contents: JobPermission.READ,
          pullRequests: JobPermission.WRITE,
          idToken: this.awsCredentials.jobPermission(),
        },
        ...(this.stackProperties[stack.stackArtifactId]?.environment
          ? {
            environment:
                              this.stackProperties[stack.stackArtifactId]
                                .environment,
          }
          : {}),
        needs: this.renderDependencies(node),
        runsOn: this.runner.runsOn,
        container: this.buildContainer,
        steps: [
          ...this.stepsToConfigureAws(region, assumeRoleArn),
          {
            id: 'Deploy',
            uses: 'aws-actions/aws-cloudformation-github-deploy@v1',
            with: params,
          },
        ],
      },
    };
  }

  private jobForBuildStep(node: AGraphNode, step: Step): Job {
    if (!(step instanceof ShellStep)) {
      throw new Error('synthStep must be a ScriptStep');
    }

    if (step.inputs.length > 0) {
      throw new Error('synthStep cannot have inputs');
    }

    if (step.outputs.length > 1) {
      throw new Error('synthStep must have a single output');
    }

    if (!step.primaryOutput) {
      throw new Error(
        'synthStep requires a primaryOutput which contains cdk.out',
      );
    }

    const cdkOut = step.outputs[0];

    const installSteps =
            step.installCommands.length > 0
              ? [
                {
                  name: 'Install',
                  run: step.installCommands.join('\n'),
                },
              ]
              : [];

    return {
      id: node.uniqueId,
      definition: {
        name: 'Synthesize',
        ...this.jobSettings,
        ...this.extendedJobSettings,
        permissions: {
          contents: JobPermission.READ,
          pullRequests: JobPermission.WRITE,
          // The Synthesize job does not use the GitHub Action Role on its own, but it's possible
          // that it is being used in the preBuildSteps.
          idToken: this.awsCredentials.jobPermission(),
        },
        runsOn: this.runner.runsOn,
        needs: this.renderDependencies(node),
        env: step.env,
        container: this.buildContainer,
        steps: [
          ...this.stepsToCheckout(),
          ...this.preBuildSteps,
          ...installSteps,
          {
            name: 'Build',
            run: step.commands.join('\n'),
          },
          ...this.postBuildSteps,
          ...this.stepsToUploadAssembly(cdkOut.directory),
        ],
      },
    };
  }

  /**
     * Searches for the stack that produced the output via the current
     * job's dependencies.
     *
     * This function should always find a stack, since it is guaranteed
     * that a CfnOutput comes from a referenced stack.
     */
  private findStackOfOutput(ref: StackOutputReference, node: AGraphNode) {
    for (const dep of node.allDeps) {
      if (
        dep.data?.type === 'execute' &&
                ref.isProducedBy(dep.data.stack)
      ) {
        return dep.uniqueId;
      }
    }
    // Should never happen
    throw new Error(
      `The output ${ref.outputName} is not referenced by any of the dependent stacks!`,
    );
  }

  private addJobOutput(jobId: string, output: JobStepOutput) {
    if (this.jobOutputs[jobId] === undefined) {
      this.jobOutputs[jobId] = [output];
    } else {
      this.jobOutputs[jobId].push(output);
    }
  }

  private jobForScriptStep(node: AGraphNode, step: ShellStep): Job {
    const envVariables: Record<string, string> = {};
    for (const [envName, ref] of Object.entries(step.envFromCfnOutputs)) {
      const jobId = this.findStackOfOutput(ref, node);
      this.addJobOutput(jobId, {
        outputName: ref.outputName,
        stepId: 'Deploy',
      });
      envVariables[envName] =
                `\${{ needs.${jobId}.outputs.${ref.outputName} }}`;
    }

    const downloadInputs = new Array<JobStep>();
    const uploadOutputs = new Array<JobStep>();

    for (const input of step.inputs) {
      downloadInputs.push({
        uses: 'actions/download-artifact@v2',
        with: {
          name: input.fileSet.id,
          path: input.directory,
        },
      });
    }

    for (const output of step.outputs) {
      uploadOutputs.push({
        uses: 'actions/upload-artifact@v2.1.1',
        with: {
          name: output.fileSet.id,
          path: output.directory,
        },
      });
    }

    const installSteps =
            step.installCommands.length > 0
              ? [
                {
                  name: 'Install',
                  run: step.installCommands.join('\n'),
                },
              ]
              : [];

    return {
      id: node.uniqueId,
      definition: {
        name: step.id,
        ...this.jobSettings,
        ...this.extendedJobSettings,
        permissions: {
          contents: JobPermission.READ,
          pullRequests: JobPermission.WRITE,
        },
        runsOn: this.runner.runsOn,
        container: this.buildContainer,
        needs: this.renderDependencies(node),
        env: {
          ...step.env,
          ...envVariables,
        },
        steps: [
          ...downloadInputs,
          ...installSteps,
          { run: step.commands.join('\n') },
          ...uploadOutputs,
        ],
      },
    };
  }

  private jobForGitHubActionStep(
    node: AGraphNode,
    step: GitHubActionStep,
  ): Job {
    return {
      id:
                this.namer?.gitHubActionJobName(node.uniqueId, step) ??
                node.uniqueId,
      definition: {
        name: step.id,
        ...this.jobSettings,
        ...this.extendedJobSettings,
        permissions: {
          contents: JobPermission.WRITE,
          idToken: this.awsCredentials.jobPermission(),
          pullRequests: JobPermission.WRITE,
        },
        runsOn: this.runner.runsOn,
        container: this.buildContainer,
        needs: this.renderDependencies(node),
        env: step.env,
        steps: step.jobSteps,
      },
    };
  }

  stepsToConfigureAws(region: string, assumeRoleArn?: string): JobStep[] {
    return this.awsCredentials.credentialSteps(region, assumeRoleArn);
  }

  private stepsToConfigureDocker(
    dockerCredential: DockerCredential,
  ): JobStep[] {
    let params: Record<string, any>;

    if (dockerCredential.name === 'docker') {
      params = {
        username: `\${{ secrets.${dockerCredential.username} }}`,
        password: `\${{ secrets.${dockerCredential.password} }}`,
      };
    } else if (dockerCredential.name === 'ecr') {
      params = {
        registry: dockerCredential.registry,
      };
    } else {
      params = {
        registry: dockerCredential.registry,
        username: `\${{ secrets.${dockerCredential.username} }}`,
        password: `\${{ secrets.${dockerCredential.password} }}`,
      };
    }

    return [
      {
        uses: 'docker/login-action@v3',
        with: params,
      },
    ];
  }

  // Restores the CDK assembly from the nearest key in the cache
  // https://github.com/actions/cache/blob/main/workarounds.md#update-a-cache
  private stepsToDownloadAssembly(targetDir: string): JobStep[] {
    if (this.preSynthed) {
      return this.stepsToCheckout();
    }

    return [
      {
        name: `Restore Cache ${CDKOUT_ARTIFACT}`,
        uses: 'actions/cache@v3',
        with: {
          key: `${CDKOUT_ARTIFACT}${CACHE_PREFIX}-${SHA_STRING}`,
          path: targetDir,
        },
      },
    ];
  }

  private stepsToCheckout(): JobStep[] {
    return [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v3',
        with: {
          ref: SHA_STRING,
        },
      },
    ];
  }

  private stepsToUploadAssembly(dir: string): JobStep[] {
    if (this.preSynthed) {
      return [];
    }

    return [
      {
        name: `Cache ${CDKOUT_ARTIFACT}`,
        uses: 'actions/cache@v3',
        with: {
          key: `${CDKOUT_ARTIFACT}${CACHE_PREFIX}-${SHA_STRING}`,
          path: dir,
        },
      },
    ];
  }

  private renderDependencies(node: AGraphNode) {
    const deps = new Array<AGraphNode>();

    for (const d of node.allDeps) {
      if (d instanceof Graph) {
        deps.push(...d.allLeaves().nodes);
      } else {
        deps.push(d);
      }
    }

    return deps.map((x) => {
      if (x.data?.type === 'execute') {
        const displayName = this.namer?.stackDisplayName(
          x.uniqueId,
          x.data.stack,
        );
        if (displayName) {
          return `${displayName}-Deploy`;
        }
      }

      if (x.data?.type == 'step') {
        const jobName = this.namer?.gitHubActionJobName(
          x.uniqueId,
          x.data.step,
        );
        if (jobName) {
          return jobName;
        }
      }

      return x.uniqueId;
    });
  }
}

interface Context {
  /**
     * The pipeline graph.
     */
  readonly structure: PipelineGraph;

  /**
     * Name of cloud assembly directory.
     */
  readonly assemblyDir: string;
}

interface Job {
  readonly id: string;
  readonly definition: GitHubJob;
}

function snakeCaseKeys<T = unknown>(obj: T, sep = '-'): T {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((o) => snakeCaseKeys(o, sep)) as any;
  }

  const result: Record<string, unknown> = {};
  for (let [k, v] of Object.entries(obj)) {
    // we don't want to snake case environment variables
    if (k !== 'env' && typeof v === 'object' && v != null) {
      v = snakeCaseKeys(v);
    }
    result[decamelize(k, { separator: sep })] = v;
  }
  return result as any;
}

function* flatten<A>(xs: Iterable<A[]>): IterableIterator<A> {
  for (const x of xs) {
    for (const y of x) {
      yield y;
    }
  }
}
