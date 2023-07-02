import { PrismaClient } from '@prisma/client';
import { getHandler, HttpStatusCodes } from '@swarmion/serverless-contracts';
import Ajv from 'ajv';

import { updateUserContract } from 'contracts/updateUserContract';

const ajv = new Ajv();

const prisma = new PrismaClient();

export const main = getHandler(updateUserContract, { ajv })(
  async ({ requestContext, body: { biography, datingGoal } }) => {
    const userId = requestContext.identity.user;

    if (userId === null) {
      throw new Error('Unexpected null user id');
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        biography,
        // lastLocation,
        datingGoal,
      },
    });

    const body = { message: 'ok' };

    return { statusCode: HttpStatusCodes.OK, body };
  },
);
