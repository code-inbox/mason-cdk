# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MasonGitHubWorkflow <a name="MasonGitHubWorkflow" id="@codeinbox/mason.MasonGitHubWorkflow"></a>

CDK Pipelines for GitHub workflows.

#### Initializers <a name="Initializers" id="@codeinbox/mason.MasonGitHubWorkflow.Initializer"></a>

```typescript
import { MasonGitHubWorkflow } from '@codeinbox/mason'

new MasonGitHubWorkflow(scope: Construct, id: string, props: MasonGitHubWorkflowProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.Initializer.parameter.props">props</a></code> | <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps">MasonGitHubWorkflowProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@codeinbox/mason.MasonGitHubWorkflow.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@codeinbox/mason.MasonGitHubWorkflow.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@codeinbox/mason.MasonGitHubWorkflow.Initializer.parameter.props"></a>

- *Type:* <a href="#@codeinbox/mason.MasonGitHubWorkflowProps">MasonGitHubWorkflowProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.addStage">addStage</a></code> | Deploy a single Stage by itself. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.addWave">addWave</a></code> | Add a Wave to the pipeline, for deploying multiple Stages in parallel. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.buildPipeline">buildPipeline</a></code> | Send the current pipeline definition to the engine, and construct the pipeline. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.addStageWithGitHubOptions">addStageWithGitHubOptions</a></code> | Deploy a single Stage by itself with options for further GitHub configuration. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.stepsToConfigureAws">stepsToConfigureAws</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@codeinbox/mason.MasonGitHubWorkflow.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addStage` <a name="addStage" id="@codeinbox/mason.MasonGitHubWorkflow.addStage"></a>

```typescript
public addStage(stage: Stage, options?: AddStageOpts): StageDeployment
```

Deploy a single Stage by itself.

Add a Stage to the pipeline, to be deployed in sequence with other
Stages added to the pipeline. All Stacks in the stage will be deployed
in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="@codeinbox/mason.MasonGitHubWorkflow.addStage.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="@codeinbox/mason.MasonGitHubWorkflow.addStage.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.AddStageOpts

---

##### `addWave` <a name="addWave" id="@codeinbox/mason.MasonGitHubWorkflow.addWave"></a>

```typescript
public addWave(id: string, options?: WaveOptions): Wave
```

Add a Wave to the pipeline, for deploying multiple Stages in parallel.

Use the return object of this method to deploy multiple stages in parallel.

Example:

```ts
declare const pipeline: pipelines.CodePipeline;

const wave = pipeline.addWave('MyWave');
wave.addStage(new MyApplicationStage(this, 'Stage1'));
wave.addStage(new MyApplicationStage(this, 'Stage2'));
```

###### `id`<sup>Required</sup> <a name="id" id="@codeinbox/mason.MasonGitHubWorkflow.addWave.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="@codeinbox/mason.MasonGitHubWorkflow.addWave.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.WaveOptions

---

##### `buildPipeline` <a name="buildPipeline" id="@codeinbox/mason.MasonGitHubWorkflow.buildPipeline"></a>

```typescript
public buildPipeline(): void
```

Send the current pipeline definition to the engine, and construct the pipeline.

It is not possible to modify the pipeline after calling this method.

##### `addStageWithGitHubOptions` <a name="addStageWithGitHubOptions" id="@codeinbox/mason.MasonGitHubWorkflow.addStageWithGitHubOptions"></a>

```typescript
public addStageWithGitHubOptions(stage: Stage, options?: MasonAddGitHubStageOptions): StageDeployment
```

Deploy a single Stage by itself with options for further GitHub configuration.

Add a Stage to the pipeline, to be deployed in sequence with other Stages added to the pipeline.
All Stacks in the stage will be deployed in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="@codeinbox/mason.MasonGitHubWorkflow.addStageWithGitHubOptions.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="@codeinbox/mason.MasonGitHubWorkflow.addStageWithGitHubOptions.parameter.options"></a>

- *Type:* <a href="#@codeinbox/mason.MasonAddGitHubStageOptions">MasonAddGitHubStageOptions</a>

---

##### `stepsToConfigureAws` <a name="stepsToConfigureAws" id="@codeinbox/mason.MasonGitHubWorkflow.stepsToConfigureAws"></a>

```typescript
public stepsToConfigureAws(region: string, assumeRoleArn?: string): JobStep[]
```

###### `region`<sup>Required</sup> <a name="region" id="@codeinbox/mason.MasonGitHubWorkflow.stepsToConfigureAws.parameter.region"></a>

- *Type:* string

---

###### `assumeRoleArn`<sup>Optional</sup> <a name="assumeRoleArn" id="@codeinbox/mason.MasonGitHubWorkflow.stepsToConfigureAws.parameter.assumeRoleArn"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.isPipeline">isPipeline</a></code> | Return whether the given object extends `PipelineBase`. |

---

##### `isConstruct` <a name="isConstruct" id="@codeinbox/mason.MasonGitHubWorkflow.isConstruct"></a>

```typescript
import { MasonGitHubWorkflow } from '@codeinbox/mason'

MasonGitHubWorkflow.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@codeinbox/mason.MasonGitHubWorkflow.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isPipeline` <a name="isPipeline" id="@codeinbox/mason.MasonGitHubWorkflow.isPipeline"></a>

```typescript
import { MasonGitHubWorkflow } from '@codeinbox/mason'

MasonGitHubWorkflow.isPipeline(x: any)
```

Return whether the given object extends `PipelineBase`.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@codeinbox/mason.MasonGitHubWorkflow.isPipeline.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.cloudAssemblyFileSet">cloudAssemblyFileSet</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The FileSet tha contains the cloud assembly. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.waves">waves</a></code> | <code>aws-cdk-lib.pipelines.Wave[]</code> | The waves in this pipeline. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.awsCredentials">awsCredentials</a></code> | <code>cdk-pipelines-github.AwsCredentialsProvider</code> | *No description.* |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.publishAssetsAuthRegion">publishAssetsAuthRegion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.workflowFile">workflowFile</a></code> | <code>cdk-pipelines-github.YamlFile</code> | *No description.* |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.workflowName">workflowName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflow.property.workflowPath">workflowPath</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@codeinbox/mason.MasonGitHubWorkflow.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cloudAssemblyFileSet`<sup>Required</sup> <a name="cloudAssemblyFileSet" id="@codeinbox/mason.MasonGitHubWorkflow.property.cloudAssemblyFileSet"></a>

```typescript
public readonly cloudAssemblyFileSet: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The FileSet tha contains the cloud assembly.

This is the primary output of the synth step.

---

##### `synth`<sup>Required</sup> <a name="synth" id="@codeinbox/mason.MasonGitHubWorkflow.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

---

##### `waves`<sup>Required</sup> <a name="waves" id="@codeinbox/mason.MasonGitHubWorkflow.property.waves"></a>

```typescript
public readonly waves: Wave[];
```

- *Type:* aws-cdk-lib.pipelines.Wave[]

The waves in this pipeline.

---

##### `awsCredentials`<sup>Required</sup> <a name="awsCredentials" id="@codeinbox/mason.MasonGitHubWorkflow.property.awsCredentials"></a>

```typescript
public readonly awsCredentials: AwsCredentialsProvider;
```

- *Type:* cdk-pipelines-github.AwsCredentialsProvider

---

##### `publishAssetsAuthRegion`<sup>Required</sup> <a name="publishAssetsAuthRegion" id="@codeinbox/mason.MasonGitHubWorkflow.property.publishAssetsAuthRegion"></a>

```typescript
public readonly publishAssetsAuthRegion: string;
```

- *Type:* string

---

##### `workflowFile`<sup>Required</sup> <a name="workflowFile" id="@codeinbox/mason.MasonGitHubWorkflow.property.workflowFile"></a>

```typescript
public readonly workflowFile: YamlFile;
```

- *Type:* cdk-pipelines-github.YamlFile

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="@codeinbox/mason.MasonGitHubWorkflow.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

---

##### `workflowPath`<sup>Required</sup> <a name="workflowPath" id="@codeinbox/mason.MasonGitHubWorkflow.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### ExtendedJobSettings <a name="ExtendedJobSettings" id="@codeinbox/mason.ExtendedJobSettings"></a>

#### Initializer <a name="Initializer" id="@codeinbox/mason.ExtendedJobSettings.Initializer"></a>

```typescript
import { ExtendedJobSettings } from '@codeinbox/mason'

const extendedJobSettings: ExtendedJobSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@codeinbox/mason.ExtendedJobSettings.property.if">if</a></code> | <code>string</code> | jobs.<job_id>.if. |
| <code><a href="#@codeinbox/mason.ExtendedJobSettings.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | Timeout in minutes after which this job will be canceled if it hasn't finished. |

---

##### `if`<sup>Optional</sup> <a name="if" id="@codeinbox/mason.ExtendedJobSettings.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

jobs.<job_id>.if.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif)

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="@codeinbox/mason.ExtendedJobSettings.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

Timeout in minutes after which this job will be canceled if it hasn't finished.

---

### MasonAddGitHubStageOptions <a name="MasonAddGitHubStageOptions" id="@codeinbox/mason.MasonAddGitHubStageOptions"></a>

#### Initializer <a name="Initializer" id="@codeinbox/mason.MasonAddGitHubStageOptions.Initializer"></a>

```typescript
import { MasonAddGitHubStageOptions } from '@codeinbox/mason'

const masonAddGitHubStageOptions: MasonAddGitHubStageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.post">post</a></code> | <code>aws-cdk-lib.pipelines.Step[]</code> | Additional steps to run after all of the stacks in the stage. |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.pre">pre</a></code> | <code>aws-cdk-lib.pipelines.Step[]</code> | Additional steps to run before any of the stacks in the stage. |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.stackSteps">stackSteps</a></code> | <code>aws-cdk-lib.pipelines.StackSteps[]</code> | Instructions for stack level steps. |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.gitHubEnvironment">gitHubEnvironment</a></code> | <code>cdk-pipelines-github.GitHubEnvironment</code> | Run the stage in a specific GitHub Environment. |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.jobSettings">jobSettings</a></code> | <code>cdk-pipelines-github.JobSettings</code> | Job level settings that will be applied to all jobs in the stage. |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.stackCapabilities">stackCapabilities</a></code> | <code>cdk-pipelines-github.StackCapabilities[]</code> | In some cases, you must explicitly acknowledge that your CloudFormation stack template contains certain capabilities in order for CloudFormation to create the stack. |
| <code><a href="#@codeinbox/mason.MasonAddGitHubStageOptions.property.extendedJobSettings">extendedJobSettings</a></code> | <code><a href="#@codeinbox/mason.ExtendedJobSettings">ExtendedJobSettings</a></code> | Additional job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs. |

---

##### `post`<sup>Optional</sup> <a name="post" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.post"></a>

```typescript
public readonly post: Step[];
```

- *Type:* aws-cdk-lib.pipelines.Step[]
- *Default:* No additional steps

Additional steps to run after all of the stacks in the stage.

---

##### `pre`<sup>Optional</sup> <a name="pre" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.pre"></a>

```typescript
public readonly pre: Step[];
```

- *Type:* aws-cdk-lib.pipelines.Step[]
- *Default:* No additional steps

Additional steps to run before any of the stacks in the stage.

---

##### `stackSteps`<sup>Optional</sup> <a name="stackSteps" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.stackSteps"></a>

```typescript
public readonly stackSteps: StackSteps[];
```

- *Type:* aws-cdk-lib.pipelines.StackSteps[]
- *Default:* No additional instructions

Instructions for stack level steps.

---

##### `gitHubEnvironment`<sup>Optional</sup> <a name="gitHubEnvironment" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.gitHubEnvironment"></a>

```typescript
public readonly gitHubEnvironment: GitHubEnvironment;
```

- *Type:* cdk-pipelines-github.GitHubEnvironment
- *Default:* no GitHub environment

Run the stage in a specific GitHub Environment.

If specified,
any protection rules configured for the environment must pass
before the job is set to a runner. For example, if the environment
has a manual approval rule configured, then the workflow will
wait for the approval before sending the job to the runner.

Running a workflow that references an environment that does not
exist will create an environment with the referenced name.

> [https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

##### `jobSettings`<sup>Optional</sup> <a name="jobSettings" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.jobSettings"></a>

```typescript
public readonly jobSettings: JobSettings;
```

- *Type:* cdk-pipelines-github.JobSettings

Job level settings that will be applied to all jobs in the stage.

Currently the only valid setting is 'if'.

---

##### `stackCapabilities`<sup>Optional</sup> <a name="stackCapabilities" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.stackCapabilities"></a>

```typescript
public readonly stackCapabilities: StackCapabilities[];
```

- *Type:* cdk-pipelines-github.StackCapabilities[]
- *Default:* ['CAPABILITY_IAM']

In some cases, you must explicitly acknowledge that your CloudFormation stack template contains certain capabilities in order for CloudFormation to create the stack.

If insufficiently specified, CloudFormation returns an `InsufficientCapabilities`
error.

---

##### `extendedJobSettings`<sup>Optional</sup> <a name="extendedJobSettings" id="@codeinbox/mason.MasonAddGitHubStageOptions.property.extendedJobSettings"></a>

```typescript
public readonly extendedJobSettings: ExtendedJobSettings;
```

- *Type:* <a href="#@codeinbox/mason.ExtendedJobSettings">ExtendedJobSettings</a>

Additional job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs.

Currently, the only valid setting
is 'timeoutMinutes'. You can use this to run jobs only in specific repositories.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository)

---

### MasonGitHubWorkflowProps <a name="MasonGitHubWorkflowProps" id="@codeinbox/mason.MasonGitHubWorkflowProps"></a>

#### Initializer <a name="Initializer" id="@codeinbox/mason.MasonGitHubWorkflowProps.Initializer"></a>

```typescript
import { MasonGitHubWorkflowProps } from '@codeinbox/mason'

const masonGitHubWorkflowProps: MasonGitHubWorkflowProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.awsCredentials">awsCredentials</a></code> | <code>cdk-pipelines-github.AwsCredentialsSecrets</code> | Names of GitHub repository secrets that include AWS credentials for deployment. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.awsCreds">awsCreds</a></code> | <code>cdk-pipelines-github.AwsCredentialsProvider</code> | Configure provider for AWS credentials used for deployment. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.buildContainer">buildContainer</a></code> | <code>cdk-pipelines-github.ContainerOptions</code> | Build container options. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.cdkCliVersion">cdkCliVersion</a></code> | <code>string</code> | Version of the CDK CLI to use. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.concurrency">concurrency</a></code> | <code>cdk-pipelines-github.ConcurrencyOptions</code> | GitHub workflow concurrency. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.dockerAssetJobSettings">dockerAssetJobSettings</a></code> | <code>cdk-pipelines-github.DockerAssetJobSettings</code> | Job level settings applied to all docker asset publishing jobs in the workflow. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.dockerCredentials">dockerCredentials</a></code> | <code>cdk-pipelines-github.DockerCredential[]</code> | The Docker Credentials to use to login. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.gitHubActionRoleArn">gitHubActionRoleArn</a></code> | <code>string</code> | A role that utilizes the GitHub OIDC Identity Provider in your AWS account. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.jobSettings">jobSettings</a></code> | <code>cdk-pipelines-github.JobSettings</code> | Job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.postBuildSteps">postBuildSteps</a></code> | <code>cdk-pipelines-github.JobStep[]</code> | GitHub workflow steps to execute after build. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.preBuildSteps">preBuildSteps</a></code> | <code>cdk-pipelines-github.JobStep[]</code> | GitHub workflow steps to execute before build. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.preSynthed">preSynthed</a></code> | <code>boolean</code> | Indicates if the repository already contains a synthesized `cdk.out` directory, in which case we will simply checkout the repo in jobs that require `cdk.out`. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.publishAssetsAuthRegion">publishAssetsAuthRegion</a></code> | <code>string</code> | Will assume the GitHubActionRole in this region when publishing assets. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.runner">runner</a></code> | <code>cdk-pipelines-github.Runner</code> | The type of runner to run the job on. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.workflowName">workflowName</a></code> | <code>string</code> | Name of the workflow. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.workflowPath">workflowPath</a></code> | <code>string</code> | File path for the GitHub workflow. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.workflowTriggers">workflowTriggers</a></code> | <code>cdk-pipelines-github.WorkflowTriggers</code> | GitHub workflow triggers. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.extendedJobSettings">extendedJobSettings</a></code> | <code><a href="#@codeinbox/mason.ExtendedJobSettings">ExtendedJobSettings</a></code> | Additional job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs. |
| <code><a href="#@codeinbox/mason.MasonGitHubWorkflowProps.property.namer">namer</a></code> | <code><a href="#@codeinbox/mason.IMasonNamer">IMasonNamer</a></code> | Optional object that can name jobs and stacks. |

---

##### `synth`<sup>Required</sup> <a name="synth" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

The primary output of this step needs to be the `cdk.out` directory
generated by the `cdk synth` command.

If you use a `ShellStep` here and you don't configure an output directory,
the output directory will automatically be assumed to be `cdk.out`.

---

##### ~~`awsCredentials`~~<sup>Optional</sup> <a name="awsCredentials" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.awsCredentials"></a>

- *Deprecated:* Use `awsCreds.fromGitHubSecrets()` instead.

```typescript
public readonly awsCredentials: AwsCredentialsSecrets;
```

- *Type:* cdk-pipelines-github.AwsCredentialsSecrets
- *Default:* `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

Names of GitHub repository secrets that include AWS credentials for deployment.

---

##### `awsCreds`<sup>Optional</sup> <a name="awsCreds" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.awsCreds"></a>

```typescript
public readonly awsCreds: AwsCredentialsProvider;
```

- *Type:* cdk-pipelines-github.AwsCredentialsProvider
- *Default:* Get AWS credentials from GitHub secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

Configure provider for AWS credentials used for deployment.

---

##### `buildContainer`<sup>Optional</sup> <a name="buildContainer" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.buildContainer"></a>

```typescript
public readonly buildContainer: ContainerOptions;
```

- *Type:* cdk-pipelines-github.ContainerOptions
- *Default:* GitHub defaults

Build container options.

---

##### `cdkCliVersion`<sup>Optional</sup> <a name="cdkCliVersion" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.cdkCliVersion"></a>

```typescript
public readonly cdkCliVersion: string;
```

- *Type:* string
- *Default:* automatic

Version of the CDK CLI to use.

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.concurrency"></a>

```typescript
public readonly concurrency: ConcurrencyOptions;
```

- *Type:* cdk-pipelines-github.ConcurrencyOptions
- *Default:* no concurrency settings

GitHub workflow concurrency.

---

##### `dockerAssetJobSettings`<sup>Optional</sup> <a name="dockerAssetJobSettings" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.dockerAssetJobSettings"></a>

```typescript
public readonly dockerAssetJobSettings: DockerAssetJobSettings;
```

- *Type:* cdk-pipelines-github.DockerAssetJobSettings
- *Default:* no additional settings

Job level settings applied to all docker asset publishing jobs in the workflow.

---

##### `dockerCredentials`<sup>Optional</sup> <a name="dockerCredentials" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.dockerCredentials"></a>

```typescript
public readonly dockerCredentials: DockerCredential[];
```

- *Type:* cdk-pipelines-github.DockerCredential[]

The Docker Credentials to use to login.

If you set this variable,
you will be logged in to docker when you upload Docker Assets.

---

##### ~~`gitHubActionRoleArn`~~<sup>Optional</sup> <a name="gitHubActionRoleArn" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.gitHubActionRoleArn"></a>

- *Deprecated:* Use `awsCreds.fromOpenIdConnect()` instead.

```typescript
public readonly gitHubActionRoleArn: string;
```

- *Type:* string
- *Default:* GitHub repository secrets are used instead of OpenId Connect role.

A role that utilizes the GitHub OIDC Identity Provider in your AWS account.

If supplied, this will be used instead of `awsCredentials`.

You can create your own role in the console with the necessary trust policy
to allow gitHub actions from your gitHub repository to assume the role, or
you can utilize the `GitHubActionRole` construct to create a role for you.

---

##### `jobSettings`<sup>Optional</sup> <a name="jobSettings" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.jobSettings"></a>

```typescript
public readonly jobSettings: JobSettings;
```

- *Type:* cdk-pipelines-github.JobSettings

Job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs.

Currently the only valid setting
is 'if'. You can use this to run jobs only in specific repositories.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository)

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* cdk-pipelines-github.JobStep[]
- *Default:* []

GitHub workflow steps to execute after build.

---

##### `preBuildSteps`<sup>Optional</sup> <a name="preBuildSteps" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.preBuildSteps"></a>

```typescript
public readonly preBuildSteps: JobStep[];
```

- *Type:* cdk-pipelines-github.JobStep[]
- *Default:* []

GitHub workflow steps to execute before build.

---

##### `preSynthed`<sup>Optional</sup> <a name="preSynthed" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.preSynthed"></a>

```typescript
public readonly preSynthed: boolean;
```

- *Type:* boolean
- *Default:* false

Indicates if the repository already contains a synthesized `cdk.out` directory, in which case we will simply checkout the repo in jobs that require `cdk.out`.

---

##### `publishAssetsAuthRegion`<sup>Optional</sup> <a name="publishAssetsAuthRegion" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.publishAssetsAuthRegion"></a>

```typescript
public readonly publishAssetsAuthRegion: string;
```

- *Type:* string
- *Default:* "us-west-2"

Will assume the GitHubActionRole in this region when publishing assets.

This is NOT the region in which the assets are published.

In most cases, you do not have to worry about this property, and can safely
ignore it.

---

##### `runner`<sup>Optional</sup> <a name="runner" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.runner"></a>

```typescript
public readonly runner: Runner;
```

- *Type:* cdk-pipelines-github.Runner
- *Default:* Runner.UBUNTU_LATEST

The type of runner to run the job on.

The runner can be either a
GitHub-hosted runner or a self-hosted runner.

---

##### `workflowName`<sup>Optional</sup> <a name="workflowName" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string
- *Default:* "deploy"

Name of the workflow.

---

##### `workflowPath`<sup>Optional</sup> <a name="workflowPath" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string
- *Default:* ".github/workflows/deploy.yml"

File path for the GitHub workflow.

---

##### `workflowTriggers`<sup>Optional</sup> <a name="workflowTriggers" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.workflowTriggers"></a>

```typescript
public readonly workflowTriggers: WorkflowTriggers;
```

- *Type:* cdk-pipelines-github.WorkflowTriggers
- *Default:* By default, workflow is triggered on push to the `main` branch and can also be triggered manually (`workflow_dispatch`).

GitHub workflow triggers.

---

##### `extendedJobSettings`<sup>Optional</sup> <a name="extendedJobSettings" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.extendedJobSettings"></a>

```typescript
public readonly extendedJobSettings: ExtendedJobSettings;
```

- *Type:* <a href="#@codeinbox/mason.ExtendedJobSettings">ExtendedJobSettings</a>

Additional job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs.

Currently, the only valid setting
is 'timeoutMinutes'. You can use this to run jobs only in specific repositories.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository)

---

##### `namer`<sup>Optional</sup> <a name="namer" id="@codeinbox/mason.MasonGitHubWorkflowProps.property.namer"></a>

```typescript
public readonly namer: IMasonNamer;
```

- *Type:* <a href="#@codeinbox/mason.IMasonNamer">IMasonNamer</a>

Optional object that can name jobs and stacks.

This can be useful to avoid name conflicts.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IMasonNamer <a name="IMasonNamer" id="@codeinbox/mason.IMasonNamer"></a>

- *Implemented By:* <a href="#@codeinbox/mason.IMasonNamer">IMasonNamer</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@codeinbox/mason.IMasonNamer.gitHubActionJobName">gitHubActionJobName</a></code> | Use this function to override GitHub Actions job names. |
| <code><a href="#@codeinbox/mason.IMasonNamer.stackDisplayName">stackDisplayName</a></code> | Use this function to set the display name of stack deployment jobs. |
| <code><a href="#@codeinbox/mason.IMasonNamer.stackName">stackName</a></code> | Use this function to override deployed stack names. |

---

##### `gitHubActionJobName` <a name="gitHubActionJobName" id="@codeinbox/mason.IMasonNamer.gitHubActionJobName"></a>

```typescript
public gitHubActionJobName(originalName: string, step: Step): string
```

Use this function to override GitHub Actions job names.

This is useful when the job name is dynamic but the
pipeline code should remain static.

###### `originalName`<sup>Required</sup> <a name="originalName" id="@codeinbox/mason.IMasonNamer.gitHubActionJobName.parameter.originalName"></a>

- *Type:* string

---

###### `step`<sup>Required</sup> <a name="step" id="@codeinbox/mason.IMasonNamer.gitHubActionJobName.parameter.step"></a>

- *Type:* aws-cdk-lib.pipelines.Step

---

##### `stackDisplayName` <a name="stackDisplayName" id="@codeinbox/mason.IMasonNamer.stackDisplayName"></a>

```typescript
public stackDisplayName(originalName: string, stack: StackDeployment): string
```

Use this function to set the display name of stack deployment jobs.

By default, the name of the job will be the
name of the stack. Sometimes we may want the name to be different. For example, if the stack name is dynamic but
the pipeline code should remain static.

This will be used for stack delpoyment job names and its display name.

###### `originalName`<sup>Required</sup> <a name="originalName" id="@codeinbox/mason.IMasonNamer.stackDisplayName.parameter.originalName"></a>

- *Type:* string

---

###### `stack`<sup>Required</sup> <a name="stack" id="@codeinbox/mason.IMasonNamer.stackDisplayName.parameter.stack"></a>

- *Type:* aws-cdk-lib.pipelines.StackDeployment

---

##### `stackName` <a name="stackName" id="@codeinbox/mason.IMasonNamer.stackName"></a>

```typescript
public stackName(originalName: string, stack: StackDeployment): string
```

Use this function to override deployed stack names.

This is useful when the stack name is dynamic but the pipeline
code should remain static.

###### `originalName`<sup>Required</sup> <a name="originalName" id="@codeinbox/mason.IMasonNamer.stackName.parameter.originalName"></a>

- *Type:* string

---

###### `stack`<sup>Required</sup> <a name="stack" id="@codeinbox/mason.IMasonNamer.stackName.parameter.stack"></a>

- *Type:* aws-cdk-lib.pipelines.StackDeployment

---


