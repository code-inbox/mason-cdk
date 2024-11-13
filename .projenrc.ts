import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { JsonPatch } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';

const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  author: 'Hana Mohan',
  authorAddress: 'unamashana@gmail.com',
  cdkVersion: '2.164.1',
  defaultReleaseBranch: 'main',
  devDeps: [
    'cdklabs-projen-project-types',
    'aws-cdk-lib',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier',
  ],
  jsiiVersion: '~5.5.0',
  constructsVersion: '10.4.2',
  name: 'mason',
  private: false,
  releaseToNpm: true,
  repositoryUrl: 'https://github.com/magicbell/mason-cdk.git',
  bundledDeps: [
    'diff',
    '@types/diff',
    'decamelize@^5.0.0',
    'yaml',
    'fast-json-patch',
  ],
  peerDeps: ['aws-cdk-lib', 'cdk-pipelines-github'],
  depsUpgrade: true,
  deps: [] /* Runtime dependencies of this module. */,

  description:
    'review pipelines with cdk and GitHub' /* The description is just a string that helps people understand the purpose of the package. */,
  packageName: '@magicbell/mason' /* The "name" in package.json. */,
  npmAccess: NpmAccess.PUBLIC,
  cdklabsPublishingDefaults: false,
});

// JSII sets this to `false` so we need to be compatible
const tsConfigDev = project.tryFindObjectFile('tsconfig.dev.json');
tsConfigDev?.patch(
  JsonPatch.replace('/compilerOptions/esModuleInterop', false),
);

project.synth();
