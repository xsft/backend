const { loginUser } = require('../service/authService');
const BadRequestException = require('../../core/exceptions/BadRequestException');

const login = async (req, res, next) => {
  const { loginParam, passwordParam } = req.body;
  if (!loginParam || !passwordParam) {
    next(new BadRequestException('Login and/or password are empty'));
    return;
  }
  try {
    const tokens = await loginUser(loginParam, passwordParam);
    res.send(tokens);
  } catch (e) {
    next(e);
  }
};

// eslint-disable-next-line no-unused-vars
const register = (req, res) => {
};

// eslint-disable-next-line no-unused-vars
const refresh = (req, res) => {
};

module.exports = {
  login,
  register,
  refresh,
};
