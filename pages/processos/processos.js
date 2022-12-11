const si = OS.getSiObj();

window.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.getElementById('tableBody');
    let loadingDiv = document.getElementById('loading');
    si.processes().then((data) => {
        loadingDiv.remove();
        gerarTabelaProcessos(tableBody, data.list.sort(((a, b) => a.cpu - b.cpu)))
        setObserver();
    })
});

si.getDynamicData().then(data => console.log(data))

function usersCallback(data) {
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML="";
    let processesList = data.processes.list;
    console.log(data.processes.list);
    processesList.sort((a, b) => a.cpu - b.cpu);
    gerarTabelaProcessos(document.getElementById('tableBody'), processesList)
    
}
const setObserver = () => {
    valueObject = {
        processes: 'list'
    }
    let observer = si.observe(valueObject, 1000, usersCallback);
    setTimeout(() => {
        clearInterval(observer)
    }, 10000);
}
const gerarTabelaProcessos = (tabelaBody, lista) => {
    lista.forEach(process => {
        let row = tabelaBody.insertRow(0);
        let cellPID = row.insertCell(-1);
        let cellPPID = row.insertCell(-1);
        let cellName = row.insertCell(-1);
        let cellCPU = row.insertCell(-1);
        let cellUsCPU = row.insertCell(-1);
        let sysCPU = row.insertCell(-1);
        let mem = row.insertCell(-1);
        let prior = row.insertCell(-1);
        let vMem = row.insertCell(-1);
        let nice = row.insertCell(-1);
        let state = row.insertCell(-1);
        cellPID.innerHTML = process.pid;
        cellPPID.innerHTML = process.parentPid
        cellName.innerHTML = process.name
        cellCPU.innerHTML = process.cpu.toFixed(2) + "%"
        cellUsCPU.innerHTML = process.cpuu.toFixed(2) + "%"
        sysCPU.innerHTML = process.cpus.toFixed(2) + "%"
        mem.innerHTML = process.mem.toFixed(2) + "%"
        prior.innerHTML = process.priority
        vMem.innerHTML = process.memVsz
        nice.innerHTML = process.nice
        state.innerHTML = process.state
    });
}
