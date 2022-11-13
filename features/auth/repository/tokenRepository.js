const { prisma } = require('../../../db/prisma');
const DatabaseException = require('../../core/exceptions/DatabaseException');

const addToken = async (token, userId) => {
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

const deleteToken = async (filter) => prisma.token.deleteMany({
  where: { ...filter },
});

const findToken = async (filter) => prisma.token.findFirst({
  where: { ...filter },
});

module.exports = {
  addToken,
  deleteToken,
  findToken,
};
