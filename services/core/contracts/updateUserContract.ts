import {
  ApiGatewayContract,
  HttpStatusCodes,
} from '@swarmion/serverless-contracts';
import { JSONSchema } from 'json-schema-to-ts';

import { DATING_GOALS } from 'types';

const locationSchema = {
  type: 'object',
  properties: {
    lat: { type: 'number' },
    long: { type: 'number' },
  },
  required: ['lat', 'long'],
  additionalProperties: false,
} as const satisfies JSONSchema;

const bodySchema = {
  type: 'object',
  properties: {
    biography: { type: 'string' },
    datingGoal: { enum: DATING_GOALS },
    lastLocation: locationSchema,
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

// move this contract to a shared library once you need to use it outside this service
export const updateUserContract = new ApiGatewayContract({
  id: 'core-update-user',
  path: '/update-user',
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
