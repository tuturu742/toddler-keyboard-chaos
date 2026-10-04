'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { shouldBlockKey } = require('../src/key-blocker');

test('blocks Escape', () => {
  assert.equal(shouldBlockKey({ key: 'Escape' }), true);
});

test('blocks forward slash', () => {
  assert.equal(shouldBlockKey({ key: '/' }), true);
});

test('blocks F11', () => {
  assert.equal(shouldBlockKey({ key: 'F11' }), true);
});

test('blocks all function keys F1 through F24', () => {
  for (let i = 1; i <= 24; i += 1) {
    assert.equal(shouldBlockKey({ key: `F${i}` }), true, `F${i} should be blocked`);
  }
});

test('blocks Ctrl+W in either case', () => {
  assert.equal(shouldBlockKey({ key: 'w', control: true }), true);
  assert.equal(shouldBlockKey({ key: 'W', control: true }), true);
  assert.equal(shouldBlockKey({ key: 'w', ctrlKey: true }), true);
});

test('blocks Ctrl+R in either case', () => {
  assert.equal(shouldBlockKey({ key: 'r', control: true }), true);
  assert.equal(shouldBlockKey({ key: 'R', control: true }), true);
});

test('blocks Ctrl+Shift+I in either case', () => {
  assert.equal(shouldBlockKey({ key: 'i', control: true, shift: true }), true);
  assert.equal(shouldBlockKey({ key: 'I', control: true, shift: true }), true);
});

test('does not block Ctrl+I without shift', () => {
  assert.equal(shouldBlockKey({ key: 'i', control: true }), false);
});

test('blocks Alt+Left and Alt+Right', () => {
  assert.equal(shouldBlockKey({ key: 'ArrowLeft', alt: true }), true);
  assert.equal(shouldBlockKey({ key: 'ArrowRight', alt: true }), true);
  assert.equal(shouldBlockKey({ key: 'Left', alt: true }), true);
  assert.equal(shouldBlockKey({ key: 'Right', alt: true }), true);
});

test('does not block arrow keys without Alt', () => {
  assert.equal(shouldBlockKey({ key: 'ArrowLeft' }), false);
  assert.equal(shouldBlockKey({ key: 'ArrowRight' }), false);
});

test('allows ordinary letters', () => {
  for (const key of ['a', 'b', 'z', 'A', 'B', 'Z']) {
    assert.equal(shouldBlockKey({ key }), false, `${key} should be allowed`);
  }
});

test('allows digits', () => {
  for (const key of ['0', '1', '2', '9']) {
    assert.equal(shouldBlockKey({ key }), false, `${key} should be allowed`);
  }
});

test('allows punctuation', () => {
  for (const key of [',', '.', ';', "'", '[', ']', '-', '=', '\\', '`', '?']) {
    assert.equal(shouldBlockKey({ key }), false, `${key} should be allowed`);
  }
});

test('returns false for empty or missing input', () => {
  assert.equal(shouldBlockKey(null), false);
  assert.equal(shouldBlockKey(undefined), false);
  assert.equal(shouldBlockKey({}), false);
});
