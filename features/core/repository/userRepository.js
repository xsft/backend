const { prisma } = require('../../../db/prisma');
const DatabaseException = require('../exceptions/DatabaseException');

const findUnique = async (data) => {
  try {
    return await prisma.user.findUnique(data);
  } catch (e) {
    throw new DatabaseException('Something went wrong while finding the user');
  }
};

module.exports = {
  findUnique,
};
