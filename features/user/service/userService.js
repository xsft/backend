const repository = require('../repository/userRepository');

const create = async (login, password) => repository.create({ login, password });

const findByLogin = async (login) => repository.findUnique({ login });

module.exports = {
  create,
  findByLogin,
};
