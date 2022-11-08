const jwt = require('jsonwebtoken');

const createToken = (data, salt) => {
  try {
    return jwt.sign({ ...data }, salt, null, null);
  } catch (e) {
    throw new Error(e);
  }
};

const verifyToken = (token, salt) => {
  try {
    return jwt.verify(token, salt, null, null);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
