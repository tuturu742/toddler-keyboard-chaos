'use strict';

const FUNCTION_KEY = /^F([1-9]|1[0-9]|2[0-4])$/;

function modifier(input, primary, secondary) {
  return Boolean(input && (input[primary] || input[secondary]));
}

function normalizeKey(input) {
  if (!input) return '';
  return String(input.key || input.code || '');
}

function shouldBlockKey(input) {
  if (!input) return false;

  const key = normalizeKey(input);
  const lower = key.toLowerCase();

  const control = modifier(input, 'control', 'ctrlKey');
  const alt = modifier(input, 'alt', 'altKey');
  const shift = modifier(input, 'shift', 'shiftKey');

  if (key === 'Escape') return true;

  if (key === '/') return true;

  if (FUNCTION_KEY.test(key)) return true;

  if (control && lower === 'w') return true;

  if (control && lower === 'r') return true;

  if (control && shift && lower === 'i') return true;

  if (alt && (key === 'ArrowLeft' || key === 'Left')) return true;

  if (alt && (key === 'ArrowRight' || key === 'Right')) return true;

  return false;
}

module.exports = { shouldBlockKey };
