import {
  ServerlessProviderConfig,
  swarmionCdkEsbuildConfig,
  swarmionEsbuildConfig,
} from '@swarmion/serverless-helpers';

export const projectName = 'pull-dating';
export const region = 'eu-west-1';
export const frameworkVersion = '>=3.0.0';

export const defaultEnvironment = 'dev';

export const sharedProviderConfig: ServerlessProviderConfig = {
  name: 'aws',
  runtime: 'nodejs16.x',
  architecture: 'arm64',
  region,
  profile: '${param:profile}', // Used to point to the right AWS account
  stage: "${opt:stage, 'dev'}", // Doc: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
  },
  deploymentMethod: 'direct',
  httpApi: {
    payload: '2.0',
    cors: {
      // @ts-expect-error we use a configuration per environment so we put it as a serverless variable
      allowedOrigins: '${param:apiGatewayCorsAllowedOrigins}',
      allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
      allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowCredentials: true,
    },
    metrics: true,
  },
};

/**
 * A set of shared parameters, scoped by stage. You can extend them to add other shared parameters between services.
 *
 * See https://www.serverless.com/framework/docs/providers/aws/guide/variables#referencing-parameters
 *
 * An empty string for a profile means that the default profile will be used
 */
export const sharedParams = {
  dev: {
    profile: 'sandbox',
    apiGatewayCorsAllowedOrigins: ['http://localhost:3000'],
    projId: '64710c0a601ef83732259f22',
  },
  staging: {
    profile: '',
    apiGatewayCorsAllowedOrigins: ['https://staging.my-domain.com'],
    projId: undefined,
  },
  production: {
    profile: '',
    apiGatewayCorsAllowedOrigins: ['https://www.my-domain.com'],
    projId: undefined,
  },
};

export const sharedEsbuildConfig = swarmionEsbuildConfig;
export const sharedCdkEsbuildConfig = swarmionCdkEsbuildConfig;
