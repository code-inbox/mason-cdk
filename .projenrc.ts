import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { JsonPatch } from 'projen/lib/json-patch';
const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  author: 'Hana Mohan',
  authorAddress: 'unamashana@gmail.com',
  cdkVersion: '2.9.0',
  defaultReleaseBranch: 'main',
  devDeps: ['cdklabs-projen-project-types', 'cdk-pipelines-github'],
  jsiiVersion: '~5.0.0',
  constructsVersion: '10.0.46',
  name: 'mason',
  private: false,
  repositoryUrl: 'https://github.com/magibell-io/mason.git',
  bundledDeps: ['diff', '@types/diff', 'decamelize', 'yaml', 'fast-json-patch'],
  peerDeps: ['aws-cdk-lib'],
  deps: ['cdk-pipelines-github'] /* Runtime dependencies of this module. */,
  description:
    'review pipelines with cdk and GitHub' /* The description is just a string that helps people understand the purpose of the package. */,
  packageName: 'mason' /* The "name" in package.json. */,
});

// JSII sets this to `false` so we need to be compatible
const tsConfigDev = project.tryFindObjectFile('tsconfig.dev.json');
tsConfigDev?.patch(
  JsonPatch.replace('/compilerOptions/esModuleInterop', false),
);

project.synth();
