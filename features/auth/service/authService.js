const argon2 = require('argon2');
const userService = require('../../user/service/userService');
const { addToken, findToken, deleteToken } = require('../repository/tokenRepository');
const { createToken, verifyToken } = require('../helpers/jwt');
const BadRequestException = require('../../core/exceptions/BadRequestException');
const validateLogin = require('../helpers/validateLogin');
const validatePassword = require('../helpers/validatePassword');
require('dotenv').config();

const accessTokenKey = process.env.JWT_ACCESS_KEY;
const refreshTokenKey = process.env.JWT_REFRESH_KEY;

const login = async (log, password) => {
  const user = await userService.findByLogin(log);
  if (!user) {
    throw new BadRequestException('Login and/or password are incorrect');
  }
  if (await argon2.verify(user.password, password)) {
    const accessToken = createToken({ id: user.id }, accessTokenKey, { expiresIn: '1m' });
    const refreshToken = createToken({ id: user.id }, refreshTokenKey);
    await addToken(refreshToken, user.id);
    return { accessToken, refreshToken };
  }
  throw new BadRequestException('Login and/or password are incorrect');
};

const register = async (log, password, repeatPassword) => {
  const user = await userService.findByLogin(log);
  if (!user) {
    if (password !== repeatPassword) throw new BadRequestException('Passwords do not match');
    const hashedPassword = await argon2.hash(validatePassword(password));
    await userService.create(validateLogin(log), hashedPassword);
  } else {
    throw new BadRequestException('User with the same login exists');
  }
};

const refresh = async (refreshToken) => {
  const payload = verifyToken(refreshToken, refreshTokenKey);
  if (payload) {
    const { id: userId } = payload;
    const foundToken = await findToken({ userId, token: refreshToken });
    if (!foundToken) throw new BadRequestException('Refresh token is invalid');
    await deleteToken({ token: refreshToken });
    const accessToken = createToken({ id: userId }, accessTokenKey, { expiresIn: '1m' });
    const refreshTokenParam = createToken({ id: userId }, refreshTokenKey);
    await addToken(refreshTokenParam, userId);
    return { accessToken, refreshToken: refreshTokenParam };
  }
  throw new BadRequestException('Refresh token is invalid');
};

module.exports = {
  login,
  refresh,
  register,
};
