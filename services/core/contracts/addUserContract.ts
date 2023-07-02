import {
  ApiGatewayContract,
  HttpStatusCodes,
} from '@swarmion/serverless-contracts';
import { JSONSchema } from 'json-schema-to-ts';

import { GENDERS } from 'types';

const bodySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    birthDate: { type: 'string' },
    gender: { enum: GENDERS },
  },
  required: ['name', 'birthDate', 'gender'],
  additionalProperties: false,
} as const satisfies JSONSchema;

// move this contract to a shared library once you need to use it outside this service
export const addUserContract = new ApiGatewayContract({
  id: 'core-add-user',
  path: '/add-user',
  method: 'POST',
  integrationType: 'restApi',
  authorizerType: 'cognito',
  bodySchema,
  outputSchemas: {
    [HttpStatusCodes.OK]: {
      type: 'object',
      properties: { message: { type: 'string' } },
      required: ['message'],
      additionalProperties: false,
    } as const,
  },
});
