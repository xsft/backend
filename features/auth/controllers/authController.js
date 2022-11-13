const service = require('../service/authService');
const BadRequestException = require('../../core/exceptions/BadRequestException');

const login = async (req, res, next) => {
  const { loginParam, passwordParam } = req.body;
  if (!loginParam || !passwordParam) {
    next(new BadRequestException('Login and/or password are empty'));
    return;
  }
  try {
    const tokens = await service.login(loginParam, passwordParam);
    res.send(tokens);
  } catch (e) {
    next(e);
  }
};

const register = async (req, res, next) => {
  const { loginParam, passwordParam, repeatPasswordParam } = req.body;
  const errors = [];
  if (!loginParam) errors.push('Login is empty');
  if (!passwordParam) errors.push('Password is empty');
  if (!repeatPasswordParam) errors.push('Repeat password is empty');
  if (errors.length !== 0) {
    const reduced = errors.reduce((previousValue, currentValue) => `${previousValue}. ${currentValue}`);
    next(new BadRequestException(reduced));
    return;
  }
  try {
    await service.register(loginParam, passwordParam, repeatPasswordParam);
    res.send();
  } catch (e) {
    next(e);
  }
};

// eslint-disable-next-line no-unused-vars
const refresh = (req, res) => {
};

module.exports = {
  login,
  register,
  refresh,
};
