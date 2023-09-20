import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
const project = new CdklabsConstructLibrary({
  author: 'Hana Mohan',
  authorAddress: 'unamashana@gmail.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['cdklabs-projen-project-types'],
  jsiiVersion: '~5.0.0',
  name: 'mason',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/unamashana/mason.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();