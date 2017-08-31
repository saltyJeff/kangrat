import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: Electron.BrowserWindow = null;
let createWindow = () => {
	win = new BrowserWindow({
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
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
	app.quit();
});
app.on('activate', () => {
	if(!win) {
		createWindow();
	}
});