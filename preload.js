'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('passwordGate', {
  sendInput: (character) => {
    ipcRenderer.send('password-input', String(character));
  },
  submit: () => {
    ipcRenderer.send('password-submit');
  },
  onResult: (callback) => {
    ipcRenderer.on('password-result', (_event, result) => {
      callback(result);
    });
  },
});
