const argon2 = require('argon2');
const { findUnique } = require('../../core/repository/userRepository');
const { addToken } = require('../repository/tokenRepository');
const { createToken } = require('../helpers/jwt');
const BadRequestException = require('../../core/exceptions/BadRequestException');
require('dotenv').config();

const accessTokenKey = process.env.JWT_ACCESS_KEY;
const refreshTokenKey = process.env.JWT_REFRESH_KEY;

const loginUser = async (login, password) => {
  const user = await findUnique({
    where: {
      login,
    },
  });
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

module.exports = {
  loginUser,
};
