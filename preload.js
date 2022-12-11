const { contextBridge } = require('electron');
const { spawn } = require('child_process');
const os = require('os')
const si = require('systeminformation');
const shell = require('shelljs');


contextBridge.exposeInMainWorld('OS', {
  getOsObj: () => os,
  getSiObj: () => si,
  getShell: () => openShell,
  getFunctionKillProcess: () => killProcess,
  getFunctionKillAll: ()=> killAllProcess
});

const openShell = () => {
  const terminal = 'gnome-terminal';
  spawn(terminal)
}

const killProcess = (pid) =>{
  shell.exec(`kill -9 ${pid}`, function(code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });
}
const killAllProcess = (name)=>{
  shell.exec(`killall -9 ${name}`, function(code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });
}