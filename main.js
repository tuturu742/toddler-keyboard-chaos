'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { shouldBlockKey } = require('./src/key-blocker');
const { createPasswordGate } = require('./src/password-gate');

function createWindow() {
  const gate = createPasswordGate();

  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.webContents.on('before-input-event', (event, input) => {
    if (shouldBlockKey(input)) {
      event.preventDefault();
      return;
    }

    if (input.type === 'keyDown' && input.key && !input.isAutoRepeat) {
      gate.type(input.key);
      if (gate.isCorrect()) {
        gate.reset();
        win.close();
      }
    }
  });

  return win;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
