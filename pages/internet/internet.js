const si = OS.getSiObj();
const killProcessPID = OS.getFunctionKillProcess();
const killProcessName = OS.getFunctionKillAll();


window.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.getElementById('tableBody');
    let loadingDiv = document.getElementById('loading');
    si.networkConnections().then((data) => {
        loadingDiv.remove();
        gerarTabelaInternet(tableBody, data.sort(((a, b) => a.pid - b.pid)))
        setObserver();
    })
});

function usersCallback({ networkConnections }) {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    networkConnections.sort((a, b) => a.pid - b.pid);
    gerarTabelaInternet(document.getElementById('tableBody'), networkConnections)

}
const setObserver = () => {
    valueObject = {
        networkConnections: 'pid, process,protocol,localAddress,localPort,state'
    }
    si.observe(valueObject, 1000, usersCallback);
}
const gerarTabelaInternet = (tabelaBody, lista) => {
    lista.forEach(network => {
        let row = tabelaBody.insertRow(0);
        let cellPID = row.insertCell(-1);
        let cellProcess = row.insertCell(-1);
        let cellProtocol = row.insertCell(-1);
        let cellLocalAddress = row.insertCell(-1);
        let cellLocalPort = row.insertCell(-1);
        let cellState = row.insertCell(-1);
        cellPID.innerHTML = network.pid;
        cellProcess.innerHTML = network.process
        cellProtocol.innerHTML = network.protocol
        cellLocalAddress.innerHTML = network.localAddress
        cellLocalPort.innerHTML = network.localPort
        cellState.innerHTML = network.state
    });
}
