const { contextBridge } = require('electron');
const { spawn } = require('child_process');
const os = require('os')
const si = require('systeminformation');
contextBridge.exposeInMainWorld('OS', {
  getOsObj: () => os,
  getSiObj: () => si,
  getShell: () => openShell
});

const openShell = () => {
  const terminal = 'gnome-terminal';
  spawn(terminal)
}