class BadRequestException extends Error {
  statusCode = 400;
}

module.exports = BadRequestException;
