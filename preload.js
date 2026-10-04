'use strict';

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('chaos', {});
