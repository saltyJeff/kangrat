"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
let win = null;
let createWindow = () => {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadURL(url.format({
        pathname: path.resolve(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', () => {
        win = null;
    });
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    electron_1.app.quit();
});
electron_1.app.on('activate', () => {
    if (!win) {
        createWindow();
    }
});
//# sourceMappingURL=index.js.map