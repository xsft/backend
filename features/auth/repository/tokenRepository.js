const { prisma } = require('../../../db/prisma');
const DatabaseException = require('../../core/exceptions/DatabaseException');

const add = async (token, userId) => {
  try {
    await prisma.token.create({
      data: {
        userId,
        token,
      },
    });
  } catch (e) {
    throw new DatabaseException('Something went wrong while adding a token');
  }
};

const remove = async (filter) => prisma.token.deleteMany({
  where: { ...filter },
});

const find = async (filter) => prisma.token.findFirst({
  where: { ...filter },
});

module.exports = {
  add,
  remove,
  find,
};
