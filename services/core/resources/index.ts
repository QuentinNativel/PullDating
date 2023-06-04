import { App } from 'aws-cdk-lib';

import {
  defaultEnvironment,
  projectName,
  region,
  sharedParams,
} from '@pull-dating/serverless-configuration';

import { CoreStack } from './stack';

const app = new App();

const stage =
  (app.node.tryGetContext('stage') as keyof typeof sharedParams | undefined) ??
  defaultEnvironment;

const projId = sharedParams[stage].projId;
if (projId === undefined) {
  throw 'Unable to retrieve Atlas project id';
}

new CoreStack(app, `${projectName}-core-${stage}`, {
  stage,
  projId,
  env: { region },
});
