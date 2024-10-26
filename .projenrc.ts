import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { JsonPatch } from 'projen';

const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  author: 'Hana Mohan',
  authorAddress: 'unamashana@gmail.com',
  cdkVersion: '2.164.1',
  defaultReleaseBranch: 'main',
  devDeps: ['cdklabs-projen-project-types', 'aws-cdk-lib'],
  jsiiVersion: '~5.5.0',
  constructsVersion: '10.4.2',
  name: 'mason',
  private: false,
  repositoryUrl: 'https://github.com/code-inbox/mason-cdk.git',
  bundledDeps: [
    'diff',
    '@types/diff',
    'decamelize@^5.0.0',
    'yaml',
    'fast-json-patch',
  ],
  peerDeps: ['aws-cdk-lib', 'cdk-pipelines-github'],
  deps: [] /* Runtime dependencies of this module. */,
  description:
    'review pipelines with cdk and GitHub' /* The description is just a string that helps people understand the purpose of the package. */,
  packageName: '@codeinbox/mason' /* The "name" in package.json. */,
});

// JSII sets this to `false` so we need to be compatible
const tsConfigDev = project.tryFindObjectFile('tsconfig.dev.json');
tsConfigDev?.patch(
  JsonPatch.replace('/compilerOptions/esModuleInterop', false),
);

project.synth();
