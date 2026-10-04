'use strict';

const DEFAULT_PASSWORD = 'parent';

function resolvePassword(configuredPassword) {
  return configuredPassword == null || configuredPassword === ''
    ? DEFAULT_PASSWORD
    : String(configuredPassword);
}

function createState(configuredPassword) {
  return {
    password: resolvePassword(configuredPassword),
    entry: '',
  };
}

function accumulate(state, character) {
  if (!state || typeof state !== 'object') {
    return state;
  }
  state.entry = state.entry + String(character);
  return state;
}

function submit(state) {
  if (!state || typeof state !== 'object') {
    return false;
  }
  if (state.entry === state.password) {
    return true;
  }
  state.entry = '';
  return false;
}

function check(state, candidate) {
  if (!state || typeof state !== 'object') {
    return false;
  }
  return String(candidate) === state.password;
}

module.exports = {
  DEFAULT_PASSWORD,
  resolvePassword,
  createState,
  accumulate,
  submit,
  check,
};
