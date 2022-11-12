const { prisma } = require('../../../db/prisma');
const DatabaseException = require('../exceptions/DatabaseException');

const findUnique = async (data) => {
  try {
    return await prisma.user.findUnique(data);
  } catch (e) {
    throw new DatabaseException('Something went wrong while finding the user');
  }
};

const addUser = async (login, password) => {
  try {
    await prisma.user.create({
      data: {
        login,
        password,
      },
    });
  } catch (e) {
    throw new DatabaseException('Something went wrong while adding a user');
  }
};

module.exports = {
  findUnique,
  addUser,
};
