import { Stack, StackProps } from 'aws-cdk-lib';
import {
  CognitoUserPoolsAuthorizer,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

import { AddUser } from 'functions/addUser/config';
import { DeleteUser, Health, UpdateUser } from 'functions/config';

interface CoreProps {
  stage: string;
  projId: string;
}

export class CoreStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps & CoreProps) {
    super(scope, id, props);

    const { stage } = props;

    // Create a Cognito user pool
    const userPool = new UserPool(this, 'PuDaUsers', {
      selfSignUpEnabled: false, // Set to true to allow users to sign up themselves
      signInAliases: { email: true }, // Allow sign in with email
      autoVerify: { email: true }, // Automatically verify email addresses
    });

    const authorizer = new CognitoUserPoolsAuthorizer(this, `PaDaAuthorizer`, {
      cognitoUserPools: [userPool],
    });

    const coreApi = new RestApi(this, 'CoreApi', {
      // the stage of the API is the same as the stage of the stack
      description: `Core API - ${stage}`,
      deployOptions: {
        stageName: stage,
      },
    });

    new Health(this, 'Health', { restApi: coreApi, authorizer });

    new AddUser(this, 'AddUser', { restApi: coreApi, authorizer });
    new UpdateUser(this, 'UpdateUser', { restApi: coreApi, authorizer });
    new DeleteUser(this, 'DeleteUser', { restApi: coreApi, authorizer });
  }
}
