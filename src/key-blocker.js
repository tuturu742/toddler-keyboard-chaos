'use strict';

const FUNCTION_KEYS = new Set([
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
  'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
]);

function shouldBlock(event) {
  if (!event || typeof event !== 'object') {
    return false;
  }

  const key = event.key != null ? String(event.key) : '';
  const code = event.code != null ? String(event.code) : '';

  const ctrl = Boolean(event.ctrlKey);
  const alt = Boolean(event.altKey);
  const shift = Boolean(event.shiftKey);

  if (key === 'Escape' || key === 'Esc') {
    return true;
  }

  if (key === '/') {
    return true;
  }

  if (key === 'F11' || code === 'F11' || FUNCTION_KEYS.has(key) || FUNCTION_KEYS.has(code)) {
    return true;
  }

  if (ctrl && (key === 'w' || key === 'W' || code === 'KeyW')) {
    return true;
  }

  if (ctrl && (key === 'r' || key === 'R' || code === 'KeyR')) {
    return true;
  }

  if (ctrl && shift && (key === 'i' || key === 'I' || code === 'KeyI')) {
    return true;
  }

  if (alt && (key === 'ArrowLeft' || code === 'ArrowLeft')) {
    return true;
  }

  if (alt && (key === 'ArrowRight' || code === 'ArrowRight')) {
    return true;
  }

  return false;
}

module.exports = { shouldBlock };
