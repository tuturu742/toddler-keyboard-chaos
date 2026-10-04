'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { shouldBlock } = require('../src/key-blocker');

test('blocks Escape', () => {
  assert.equal(shouldBlock({ key: 'Escape', code: 'Escape' }), true);
});

test('blocks slash', () => {
  assert.equal(shouldBlock({ key: '/', code: 'Slash' }), true);
});

test('blocks F11', () => {
  assert.equal(shouldBlock({ key: 'F11', code: 'F11' }), true);
});

test('blocks every function key F1 through F12', () => {
  for (let n = 1; n <= 12; n += 1) {
    const name = `F${n}`;
    assert.equal(shouldBlock({ key: name, code: name }), true, name);
  }
});

test('blocks Ctrl+W', () => {
  assert.equal(shouldBlock({ key: 'w', code: 'KeyW', ctrlKey: true }), true);
  assert.equal(shouldBlock({ key: 'W', code: 'KeyW', ctrlKey: true }), true);
});

test('blocks Ctrl+R', () => {
  assert.equal(shouldBlock({ key: 'r', code: 'KeyR', ctrlKey: true }), true);
  assert.equal(shouldBlock({ key: 'R', code: 'KeyR', ctrlKey: true }), true);
});

test('blocks Ctrl+Shift+I', () => {
  assert.equal(shouldBlock({ key: 'i', code: 'KeyI', ctrlKey: true, shiftKey: true }), true);
  assert.equal(shouldBlock({ key: 'I', code: 'KeyI', ctrlKey: true, shiftKey: true }), true);
});

test('blocks Alt+Left', () => {
  assert.equal(shouldBlock({ key: 'ArrowLeft', code: 'ArrowLeft', altKey: true }), true);
});

test('blocks Alt+Right', () => {
  assert.equal(shouldBlock({ key: 'ArrowRight', code: 'ArrowRight', altKey: true }), true);
});

test('allows ordinary letters', () => {
  for (const key of ['a', 'b', 'z', 'A', 'Z']) {
    assert.equal(shouldBlock({ key, code: `Key${key.toUpperCase()}` }), false, key);
  }
});

test('allows digits', () => {
  for (const key of ['0', '1', '9']) {
    assert.equal(shouldBlock({ key, code: `Digit${key}` }), false, key);
  }
});

test('allows punctuation other than slash', () => {
  for (const key of ['.', ',', ';', '-', '=', "'", '[', ']', '\\']) {
    assert.equal(shouldBlock({ key }), false, key);
  }
});

test('allows ordinary letters even with modifiers', () => {
  assert.equal(shouldBlock({ key: 'a', code: 'KeyA', shiftKey: true }), false);
});

test('allows nullish input', () => {
  assert.equal(shouldBlock(null), false);
  assert.equal(shouldBlock(undefined), false);
  assert.equal(shouldBlock({}), false);
});
