'use strict';

const DEFAULT_PASSWORD = 'parent';

function createPasswordGate(password = DEFAULT_PASSWORD) {
  const expected = String(password);
  let buffer = '';

  return {
    type(char) {
      buffer += char;
      return buffer;
    },
    reset() {
      buffer = '';
      return buffer;
    },
    isCorrect() {
      return buffer === expected;
    },
    check(input) {
      return input === expected;
    },
    entered() {
      return buffer;
    },
  };
}

module.exports = { DEFAULT_PASSWORD, createPasswordGate };
