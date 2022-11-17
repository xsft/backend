const BadRequestException = require('../../core/exceptions/BadRequestException');
const validateStringLength = require('./validateStringLength');

const min = 4;
const max = 8;

const validatePassword = (password) => {
  if (typeof password !== 'string') {
    throw new BadRequestException('Password should be a string');
  }
  if (!validateStringLength(password, min, max)) {
    throw new BadRequestException(`Password should be at least ${min} and at most ${max} characters`);
  }
  return password;
};

module.exports = validatePassword;
