const jwt = require('jsonwebtoken');

const createToken = (data, salt, options) => {
  try {
    return jwt.sign({ ...data }, salt, { ...options }, null);
  } catch (e) {
    throw new Error(e);
  }
};

const verifyToken = (token, salt) => {
  try {
    return jwt.verify(token, salt);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
