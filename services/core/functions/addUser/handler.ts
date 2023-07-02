import { PrismaClient } from '@prisma/client';
import { getHandler, HttpStatusCodes } from '@swarmion/serverless-contracts';
import Ajv from 'ajv';
import moment from 'moment';

import { addUserContract } from 'contracts/addUserContract';

const ajv = new Ajv();

const prisma = new PrismaClient();

export const main = getHandler(addUserContract, { ajv })(
  async ({
    requestContext,
    body: { name, birthDate: strBirthDate, gender },
  }) => {
    const userId = requestContext.identity.user;
    const birthDate = moment(strBirthDate, true);

    if (userId === null) {
      throw new Error('Unexpected null user id');
    }

    if (!birthDate.isValid()) {
      throw new Error('Unvalid birth date');
    }

    await prisma.user.create({
      data: {
        id: userId,
        birthDate: birthDate.toDate(),
        gender: gender,
        name,
      },
    });

    const body = { message: 'ok' };

    return { statusCode: HttpStatusCodes.OK, body };
  },
);
