function validateStringLength(string, minExclusive, maxExclusive) {
  return !(string.length < minExclusive || string.length > maxExclusive);
}

module.exports = validateStringLength;
