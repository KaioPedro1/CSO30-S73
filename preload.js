const { contextBridge } = require('electron');
const os = require('os')
const si = require('systeminformation');

contextBridge.exposeInMainWorld('OS', {
  getOsObj: () => os,
  getSiObj: () => si
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("hardware").addEventListener("click", () => window.location.href = "./pages/detalhesSO.html");
})
