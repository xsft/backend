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

module.exports = {
  addToken,
};
