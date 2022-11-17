const { prisma } = require('../../../db/prisma');

const findUnique = async (data) => prisma.user.findUnique({
  where: { ...data },
});

const create = async (user) => prisma.user.create({
  data: { ...user },
});

module.exports = {
  findUnique,
  create,
};
