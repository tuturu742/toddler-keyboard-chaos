'use strict';

(function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const exitButton = document.getElementById('exit-button');
  const exitUi = document.getElementById('exit-ui');
  const passwordInput = document.getElementById('password-input');
  const passwordSubmit = document.getElementById('password-submit');
  const exitStatus = document.getElementById('exit-status');

  let exitUiVisible = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function paint(x, y) {
    const size = 20 + Math.random() * 80;
    const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 55%)`;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  window.addEventListener('keydown', (event) => {
    if (exitUiVisible) {
      return;
    }
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    paint(x, y);
  });

  window.addEventListener('mousedown', (event) => {
    if (exitUi.contains(event.target)) {
      return;
    }
    paint(event.clientX, event.clientY);
  });

  function showExitUi() {
    exitUiVisible = true;
    exitUi.classList.add('visible');
    exitButton.classList.add('hidden');
    passwordInput.value = '';
    exitStatus.textContent = '';
    passwordInput.focus();
  }

  exitButton.addEventListener('click', showExitUi);

  if (window.passwordGate) {
    window.passwordGate.onResult((result) => {
      if (result.ok) {
        exitStatus.textContent = 'Bye!';
      } else {
        exitStatus.textContent = 'Wrong password, try again.';
        passwordInput.value = '';
        passwordInput.focus();
      }
    });

    passwordSubmit.addEventListener('click', () => {
      window.passwordGate.submit();
    });

    passwordInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        window.passwordGate.submit();
      } else if (event.key.length === 1) {
        window.passwordGate.sendInput(event.key);
      }
    });
  }
})();
