const { contextBridge } = require('electron');
const os = require('os')
const si = require('systeminformation');
contextBridge.exposeInMainWorld('OS', {
  getOsObj: () => os,
  getSiObj: () => si,
  getShell: () => shell
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("hardware").addEventListener("click", () => window.location.href = "./pages/detalhesSO.html");
  document.getElementById("shell").addEventListener("click", openShell);
})

const openShell = () => {
  const shell = require('shelljs');
  shell.echo('Aberto pelo dashboard');
  shell
}