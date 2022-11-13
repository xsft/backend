const jwt = require('jsonwebtoken');

const create = (data, salt, options) => {
  try {
    return jwt.sign({ ...data }, salt, { ...options }, null);
  } catch (e) {
    throw new Error(e);
  }
};

const verify = (token, salt) => {
  try {
    return jwt.verify(token, salt);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  create,
  verify,
};
