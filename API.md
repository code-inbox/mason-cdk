# replace this
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MasonGitHubWorkflow <a name="MasonGitHubWorkflow" id="mason.MasonGitHubWorkflow"></a>

CDK Pipelines for GitHub workflows.

#### Initializers <a name="Initializers" id="mason.MasonGitHubWorkflow.Initializer"></a>

```typescript
import { MasonGitHubWorkflow } from 'mason'

new MasonGitHubWorkflow(scope: Construct, id: string, props: GitHubWorkflowProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#mason.MasonGitHubWorkflow.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#mason.MasonGitHubWorkflow.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#mason.MasonGitHubWorkflow.Initializer.parameter.props">props</a></code> | <code>cdk-pipelines-github.GitHubWorkflowProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="mason.MasonGitHubWorkflow.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="mason.MasonGitHubWorkflow.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="mason.MasonGitHubWorkflow.Initializer.parameter.props"></a>

- *Type:* cdk-pipelines-github.GitHubWorkflowProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#mason.MasonGitHubWorkflow.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#mason.MasonGitHubWorkflow.addStage">addStage</a></code> | Deploy a single Stage by itself. |
| <code><a href="#mason.MasonGitHubWorkflow.addWave">addWave</a></code> | Add a Wave to the pipeline, for deploying multiple Stages in parallel. |
| <code><a href="#mason.MasonGitHubWorkflow.buildPipeline">buildPipeline</a></code> | Send the current pipeline definition to the engine, and construct the pipeline. |
| <code><a href="#mason.MasonGitHubWorkflow.addStageWithGitHubOptions">addStageWithGitHubOptions</a></code> | Deploy a single Stage by itself with options for further GitHub configuration. |
| <code><a href="#mason.MasonGitHubWorkflow.stepsToConfigureAws">stepsToConfigureAws</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="mason.MasonGitHubWorkflow.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addStage` <a name="addStage" id="mason.MasonGitHubWorkflow.addStage"></a>

```typescript
public addStage(stage: Stage, options?: AddStageOpts): StageDeployment
```

Deploy a single Stage by itself.

Add a Stage to the pipeline, to be deployed in sequence with other
Stages added to the pipeline. All Stacks in the stage will be deployed
in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="mason.MasonGitHubWorkflow.addStage.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="mason.MasonGitHubWorkflow.addStage.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.AddStageOpts

---

##### `addWave` <a name="addWave" id="mason.MasonGitHubWorkflow.addWave"></a>

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

###### `id`<sup>Required</sup> <a name="id" id="mason.MasonGitHubWorkflow.addWave.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="mason.MasonGitHubWorkflow.addWave.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.WaveOptions

---

##### `buildPipeline` <a name="buildPipeline" id="mason.MasonGitHubWorkflow.buildPipeline"></a>

```typescript
public buildPipeline(): void
```

Send the current pipeline definition to the engine, and construct the pipeline.

It is not possible to modify the pipeline after calling this method.

##### `addStageWithGitHubOptions` <a name="addStageWithGitHubOptions" id="mason.MasonGitHubWorkflow.addStageWithGitHubOptions"></a>

```typescript
public addStageWithGitHubOptions(stage: Stage, options?: AddGitHubStageOptions): StageDeployment
```

Deploy a single Stage by itself with options for further GitHub configuration.

Add a Stage to the pipeline, to be deployed in sequence with other Stages added to the pipeline.
All Stacks in the stage will be deployed in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="mason.MasonGitHubWorkflow.addStageWithGitHubOptions.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="mason.MasonGitHubWorkflow.addStageWithGitHubOptions.parameter.options"></a>

- *Type:* cdk-pipelines-github.AddGitHubStageOptions

---

##### `stepsToConfigureAws` <a name="stepsToConfigureAws" id="mason.MasonGitHubWorkflow.stepsToConfigureAws"></a>

```typescript
public stepsToConfigureAws(region: string, assumeRoleArn?: string): JobStep[]
```

###### `region`<sup>Required</sup> <a name="region" id="mason.MasonGitHubWorkflow.stepsToConfigureAws.parameter.region"></a>

- *Type:* string

---

###### `assumeRoleArn`<sup>Optional</sup> <a name="assumeRoleArn" id="mason.MasonGitHubWorkflow.stepsToConfigureAws.parameter.assumeRoleArn"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#mason.MasonGitHubWorkflow.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="mason.MasonGitHubWorkflow.isConstruct"></a>

```typescript
import { MasonGitHubWorkflow } from 'mason'

MasonGitHubWorkflow.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="mason.MasonGitHubWorkflow.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#mason.MasonGitHubWorkflow.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#mason.MasonGitHubWorkflow.property.cloudAssemblyFileSet">cloudAssemblyFileSet</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The FileSet tha contains the cloud assembly. |
| <code><a href="#mason.MasonGitHubWorkflow.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#mason.MasonGitHubWorkflow.property.waves">waves</a></code> | <code>aws-cdk-lib.pipelines.Wave[]</code> | The waves in this pipeline. |
| <code><a href="#mason.MasonGitHubWorkflow.property.awsCredentials">awsCredentials</a></code> | <code>cdk-pipelines-github.AwsCredentialsProvider</code> | *No description.* |
| <code><a href="#mason.MasonGitHubWorkflow.property.publishAssetsAuthRegion">publishAssetsAuthRegion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#mason.MasonGitHubWorkflow.property.workflowFile">workflowFile</a></code> | <code>cdk-pipelines-github.YamlFile</code> | *No description.* |
| <code><a href="#mason.MasonGitHubWorkflow.property.workflowName">workflowName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#mason.MasonGitHubWorkflow.property.workflowPath">workflowPath</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="mason.MasonGitHubWorkflow.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cloudAssemblyFileSet`<sup>Required</sup> <a name="cloudAssemblyFileSet" id="mason.MasonGitHubWorkflow.property.cloudAssemblyFileSet"></a>

```typescript
public readonly cloudAssemblyFileSet: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The FileSet tha contains the cloud assembly.

This is the primary output of the synth step.

---

##### `synth`<sup>Required</sup> <a name="synth" id="mason.MasonGitHubWorkflow.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

---

##### `waves`<sup>Required</sup> <a name="waves" id="mason.MasonGitHubWorkflow.property.waves"></a>

```typescript
public readonly waves: Wave[];
```

- *Type:* aws-cdk-lib.pipelines.Wave[]

The waves in this pipeline.

---

##### `awsCredentials`<sup>Required</sup> <a name="awsCredentials" id="mason.MasonGitHubWorkflow.property.awsCredentials"></a>

```typescript
public readonly awsCredentials: AwsCredentialsProvider;
```

- *Type:* cdk-pipelines-github.AwsCredentialsProvider

---

##### `publishAssetsAuthRegion`<sup>Required</sup> <a name="publishAssetsAuthRegion" id="mason.MasonGitHubWorkflow.property.publishAssetsAuthRegion"></a>

```typescript
public readonly publishAssetsAuthRegion: string;
```

- *Type:* string

---

##### `workflowFile`<sup>Required</sup> <a name="workflowFile" id="mason.MasonGitHubWorkflow.property.workflowFile"></a>

```typescript
public readonly workflowFile: YamlFile;
```

- *Type:* cdk-pipelines-github.YamlFile

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="mason.MasonGitHubWorkflow.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

---

##### `workflowPath`<sup>Required</sup> <a name="workflowPath" id="mason.MasonGitHubWorkflow.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### JobSettings <a name="JobSettings" id="mason.JobSettings"></a>

#### Initializer <a name="Initializer" id="mason.JobSettings.Initializer"></a>

```typescript
import { JobSettings } from 'mason'

const jobSettings: JobSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#mason.JobSettings.property.if">if</a></code> | <code>string</code> | jobs.<job_id>.if. |
| <code><a href="#mason.JobSettings.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | Timeout in minutes after which this job will be canceled if it hasn't finished. |

---

##### `if`<sup>Optional</sup> <a name="if" id="mason.JobSettings.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

jobs.<job_id>.if.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif)

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="mason.JobSettings.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

Timeout in minutes after which this job will be canceled if it hasn't finished.

---
