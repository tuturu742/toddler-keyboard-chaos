'use strict';

const canvas = document.getElementById('chaos');
const ctx = canvas.getContext('2d');

function resize() {
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

window.addEventListener('resize', resize);
resize();

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 60%)`;
}

function paint(x, y) {
  const colors = [randomColor(), randomColor()];
  const shape = Math.floor(Math.random() * 3);
  const size = 20 + Math.floor(Math.random() * 80);

  ctx.save();
  ctx.translate(x, y);

  if (shape === 0) {
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === 1) {
    ctx.fillStyle = colors[0];
    ctx.fillRect(-size / 2, -size / 2, size, size);
  } else {
    ctx.fillStyle = colors[0];
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.lineTo(-size / 2, size / 2);
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = colors[1];
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

function keyLocation() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };
}

window.addEventListener('keydown', () => {
  const { x, y } = keyLocation();
  paint(x, y);
});

window.addEventListener('click', (event) => {
  paint(event.clientX, event.clientY);
});
