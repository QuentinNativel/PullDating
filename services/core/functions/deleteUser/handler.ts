import { PrismaClient } from '@prisma/client';
import { HttpStatusCodes } from '@swarmion/serverless-contracts';

const prisma = new PrismaClient();

export const main = async ({
  userId,
}: {
  userId: string;
}): Promise<unknown> => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  const body = { message: 'ok' };

  return { statusCode: HttpStatusCodes.OK, body };
};
