'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { shouldBlock } = require('./src/key-blocker');
const { createState, accumulate, submit } = require('./src/password-gate');

const PASSWORD_STATE = createState(process.env.EXIT_PASSWORD);

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile('index.html');

  win.webContents.on('before-input-event', (event, input) => {
    if (shouldBlock({
      key: input.key,
      code: input.code,
      ctrlKey: input.control,
      altKey: input.alt,
      shiftKey: input.shift,
    })) {
      event.preventDefault();
    }
  });

  return win;
}

app.whenReady().then(() => {
  const win = createWindow();

  ipcMain.on('password-input', (_event, character) => {
    accumulate(PASSWORD_STATE, character);
  });

  ipcMain.on('password-submit', (event) => {
    if (submit(PASSWORD_STATE)) {
      event.sender.send('password-result', { ok: true });
      win.close();
    } else {
      event.sender.send('password-result', { ok: false });
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
