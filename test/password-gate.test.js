'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createPasswordGate, DEFAULT_PASSWORD } = require('../src/password-gate');

test('default password is parent', () => {
  assert.equal(DEFAULT_PASSWORD, 'parent');
});

test('accepts the default password', () => {
  const gate = createPasswordGate();
  for (const ch of 'parent') gate.type(ch);
  assert.equal(gate.isCorrect(), true);
});

test('accepts a configured password', () => {
  const gate = createPasswordGate('abc123');
  for (const ch of 'abc123') gate.type(ch);
  assert.equal(gate.isCorrect(), true);
});

test('rejects an incorrect password', () => {
  const gate = createPasswordGate();
  for (const ch of 'wrong') gate.type(ch);
  assert.equal(gate.isCorrect(), false);
});

test('check compares arbitrary input to the configured password', () => {
  const gate = createPasswordGate('parent');
  assert.equal(gate.check('parent'), true);
  assert.equal(gate.check('wrong'), false);
});

test('reset clears the accumulated buffer', () => {
  const gate = createPasswordGate();
  gate.type('p');
  gate.type('a');
  assert.equal(gate.entered(), 'pa');
  gate.reset();
  assert.equal(gate.entered(), '');
  assert.equal(gate.isCorrect(), false);
});

test('reset after a wrong answer allows a correct entry', () => {
  const gate = createPasswordGate('parent');
  for (const ch of 'parx') gate.type(ch);
  assert.equal(gate.isCorrect(), false);
  gate.reset();
  for (const ch of 'parent') gate.type(ch);
  assert.equal(gate.isCorrect(), true);
});
