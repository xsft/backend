const BadRequestException = require('../../core/exceptions/BadRequestException');
const validateStringLength = require('./validateStringLength');

const min = 2;
const max = 8;

const validateLogin = (login) => {
  if (typeof login !== 'string') {
    throw new BadRequestException('Login should be a string');
  }
  if (!validateStringLength(login, min, max)) {
    throw new BadRequestException(`Login should be at least ${min} and at most ${max} characters`);
  }
  return login;
};

module.exports = validateLogin;
