import { getCdkHandlerPath } from '@swarmion/serverless-helpers';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { sharedCdkEsbuildConfig } from '@pull-dating/serverless-configuration';

import { updateUserContract } from 'contracts/updateUserContract';
import { ApiWithCognitoAuthorizerProps } from 'functions/types';

export class UpdateUser extends Construct {
  public addUserFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    { restApi, authorizer }: ApiWithCognitoAuthorizerProps,
  ) {
    super(scope, id);

    this.addUserFunction = new NodejsFunction(this, 'Lambda', {
      entry: getCdkHandlerPath(__dirname),
      handler: 'main',
      runtime: Runtime.NODEJS_16_X,
      architecture: Architecture.ARM_64,
      awsSdkConnectionReuse: true,
      bundling: sharedCdkEsbuildConfig,
    });

    restApi.root
      .resourceForPath(updateUserContract.path)
      .addMethod(
        updateUserContract.method,
        new LambdaIntegration(this.addUserFunction),
        { authorizer },
      );
  }
}
