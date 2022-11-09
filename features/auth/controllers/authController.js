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

const register = (req, res) => {
};

const refresh = (req, res) => {
};

module.exports = {
  login,
  register,
  refresh,
};
