import {
  CognitoUserPoolsAuthorizer,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';

export type ApiWithCognitoAuthorizerProps = {
  restApi: RestApi;
  authorizer: CognitoUserPoolsAuthorizer;
};
