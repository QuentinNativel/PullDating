import {
  ApiGatewayContract,
  HttpStatusCodes,
} from '@swarmion/serverless-contracts';

// move this contract to a shared library once you need to use it outside this service
export const deleteUserContract = new ApiGatewayContract({
  id: 'core-add-user',
  path: '/user',
  method: 'DELETE',
  integrationType: 'restApi',
  authorizerType: 'cognito',
  outputSchemas: {
    [HttpStatusCodes.OK]: {
      type: 'object',
      properties: { message: { type: 'string' } },
      required: ['message'],
      additionalProperties: false,
    } as const,
  },
});
