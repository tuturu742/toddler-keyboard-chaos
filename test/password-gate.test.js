'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  DEFAULT_PASSWORD,
  resolvePassword,
  createState,
  accumulate,
  submit,
  check,
} = require('../src/password-gate');

test('default password is parent', () => {
  assert.equal(DEFAULT_PASSWORD, 'parent');
  assert.equal(resolvePassword(undefined), 'parent');
  assert.equal(resolvePassword(null), 'parent');
  assert.equal(resolvePassword(''), 'parent');
});

test('configured password is used', () => {
  assert.equal(resolvePassword('secret'), 'secret');
  const state = createState('secret');
  assert.equal(state.password, 'secret');
});

test('check reports success only for the configured password', () => {
  const state = createState('secret');
  assert.equal(check(state, 'secret'), true);
  assert.equal(check(state, 'parent'), false);
  assert.equal(check(state, 'other'), false);
});

test('check reports success only for the default password', () => {
  const state = createState();
  assert.equal(check(state, 'parent'), true);
  assert.equal(check(state, 'secret'), false);
});

test('accumulates typed characters', () => {
  const state = createState('parent');
  accumulate(state, 'p');
  accumulate(state, 'a');
  accumulate(state, 'r');
  assert.equal(state.entry, 'par');
  accumulate(state, 'e');
  accumulate(state, 'n');
  accumulate(state, 't');
  assert.equal(state.entry, 'parent');
});

test('submit succeeds for the correct password', () => {
  const state = createState('parent');
  for (const ch of 'parent') {
    accumulate(state, ch);
  }
  assert.equal(submit(state), true);
});

test('submit fails for a wrong password', () => {
  const state = createState('parent');
  for (const ch of 'wrong') {
    accumulate(state, ch);
  }
  assert.equal(submit(state), false);
});

test('submit resets accumulated entry after a wrong submission', () => {
  const state = createState('parent');
  for (const ch of 'wrong') {
    accumulate(state, ch);
  }
  assert.equal(state.entry, 'wrong');
  assert.equal(submit(state), false);
  assert.equal(state.entry, '');
});

test('entry can be re-accumulated after a reset', () => {
  const state = createState('parent');
  for (const ch of 'wrong') {
    accumulate(state, ch);
  }
  submit(state);
  assert.equal(state.entry, '');
  for (const ch of 'parent') {
    accumulate(state, ch);
  }
  assert.equal(submit(state), true);
});

test('submit does not reset entry on a correct submission', () => {
  const state = createState('parent');
  for (const ch of 'parent') {
    accumulate(state, ch);
  }
  submit(state);
  assert.equal(state.entry, 'parent');
});

test('accumulate coerces input to string', () => {
  const state = createState('parent');
  accumulate(state, 7);
  assert.equal(state.entry, '7');
});
