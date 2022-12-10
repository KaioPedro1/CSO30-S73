const { contextBridge } = require('electron');
const { spawn } = require('child_process');
const os = require('os')
const si = require('systeminformation');
contextBridge.exposeInMainWorld('OS', {
  getOsObj: () => os,
  getSiObj: () => si,
  getShell: () => shell
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("hardware").addEventListener("click", () => window.location.href = "./pages/detalhes/detalhesSO.html");
  document.getElementById("desempenho").addEventListener("click", () => window.location.href = "./pages/desempenho/desempenho.html");
  document.getElementById("shell").addEventListener("click", openShell);
})

const openShell = () => {
  const terminal = 'gnome-terminal';
  spawn(terminal)
}