const os = OS.getOsObj();
const siStaticData = OS.getSiObj();
const osCpus = os.cpus();

getDataAndFillInfo();

function getDataAndFillInfo() {
    siStaticData.osInfo().then((osData) => gerarInfoGeneric(osData, 'os_tab', 'Dados do sistema operacional'));
    siStaticData.baseboard().then((motherboardData) => gerarInfoGeneric(motherboardData, 'placa_mae_tab', 'Dados da placa mãe'));
    siStaticData.bios().then((biosData) => gerarInfoGeneric(biosData, 'bios_tab', 'Dados da bios'));
    siStaticData.diskLayout().then((diskLayoutData) => gerarInfoGeneric(diskLayoutData, 'disk_tab', 'Dados do disco'));
    siStaticData.memLayout().then((memLayoutData) => gerarInfoGeneric(memLayoutData, 'mem_tab', 'Dados da memória ram'));
    siStaticData.graphics().then((graphicsData) => gerarInfoGeneric(graphicsData.controllers, 'graphics_tab', 'Dados da placa de video'));
}
window.addEventListener('DOMContentLoaded', () => {
    gerarTabelaCPU(document.getElementById('tabela_cpu_body'));
})
const gerarInfoGeneric = (data, containerID, titulo) => {
    let osTabDiv = document.getElementById(containerID);
    let listDiv = document.createElement('div');
    while (osTabDiv.firstChild) {
        osTabDiv.removeChild(osTabDiv.firstChild);
    }
    criarTitulo(osTabDiv, titulo)
    if (!Array.isArray(data)) {
        let arrOS = Object.entries(data);
        arrOS.forEach((item) => {
            let p = document.createElement('p');
            p.innerHTML = `<strong>${item[0].toUpperCase()}:</strong> ${item[1]}`;
            listDiv.appendChild(p)
        })
    } else {
        data.forEach((obj,index) => {
            let numero = document.createElement("h3");
            numero.innerText = Number(index+1)+')';
            osTabDiv.appendChild(numero)
            let arrFromObj = Object.entries(obj);
            arrFromObj.forEach((item) => {
                let p = document.createElement('p');
                p.innerHTML = `<strong>${item[0].toUpperCase()}:</strong> ${item[1]}`;
                listDiv.appendChild(p)
            })
        })
    }

    osTabDiv.appendChild(listDiv);
}
const gerarTabelaCPU = (tabelaBody) => {
    osCpus.forEach(cpu => {
        let row = tabelaBody.insertRow(0);
        let cellModel = row.insertCell(-1);
        let cellSpeed = row.insertCell(-1);
        let cellUserTime = row.insertCell(-1);
        let cellSysTime = row.insertCell(-1);
        let cellIdleTime = row.insertCell(-1);
        let cellIrqTime = row.insertCell(-1);
        cellModel.innerHTML = cpu.model;
        cellSpeed.innerHTML = cpu.speed + "MHz";
        cellUserTime.innerHTML = parseInt(cpu.times.user / 60000) + " Min"
        cellSysTime.innerHTML = parseInt(cpu.times.sys / 60000) + " Min"
        cellIdleTime.innerHTML = parseInt(cpu.times.idle / 60000) + " Min"
        cellIrqTime.innerHTML = parseInt(cpu.times.irq / 60000) + " Min"
    });
    document.getElementById('total_nucleos').innerHTML = `Total de núcleos: ${osCpus.length}`
    document.getElementById('cpu_arq').innerHTML = `${os.arch()}`
}
const criarTitulo = (containerHTML, text) => {
    let titulo = document.createElement("h1");
    titulo.className = "title"
    titulo.innerText = text;
    containerHTML.appendChild(titulo)
}/*
const gerarTabelaOS = (data) =>{ 
    let osTabDiv = document.getElementById('os_tab');
    let listDiv = document.createElement('div');
    arrOS = Object.entries(data);   
    while (osTabDiv.firstChild) {
        osTabDiv.removeChild(osTabDiv.firstChild);
    }
    criarTitulo(osTabDiv, 'Dados do sistema operacional estático')
    arrOS.forEach((item)=>{   
        let p = document.createElement('p');
        p.innerHTML = item[0].toUpperCase()+': '+item[1];
        listDiv.appendChild(p)
    })
    osTabDiv.appendChild(listDiv);
}
const gerarTabelaMotherboard = (data) =>{
    let osTabDiv = document.getElementById('placa_mae_tab');
    let listDiv = document.createElement('div');
    arrOS = Object.entries(data);   
    while (osTabDiv.firstChild) {
        osTabDiv.removeChild(osTabDiv.firstChild);
    }
    criarTitulo(osTabDiv, 'Dados do sistema operacional estático')
    arrOS.forEach((item)=>{   
        let p = document.createElement('p');
        p.innerHTML = item[0].toUpperCase()+': '+item[1];
        listDiv.appendChild(p)
    })
    osTabDiv.appendChild(listDiv);
}*/