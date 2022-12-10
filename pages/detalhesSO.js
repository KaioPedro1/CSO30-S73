const os = OS.getOsObj();
const siStaticData = OS.getSiObj();
const osCpus = os.cpus();
siStaticData.getStaticData().then(data=>gerarTabelaOS(data.os))
window.addEventListener('DOMContentLoaded', () => {
    gerarTabelaCPU(document.getElementById('tabela_cpu_body'));
})

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

const gerarTabelaOS = (data) =>{ 
    let osTabDiv = document.getElementById('os_tab');    
    let osArray = Object.entries(data);
    while (osTabDiv.firstChild) {
        osTabDiv.removeChild(osTabDiv.firstChild);
    }
    criarTitulo(osTabDiv, 'Dados do sistema operacional estático')
   
    console.log(osArray);
}
const criarTitulo = (containerHTML, text) =>{
    let titulo = document.createElement("h1");
    titulo.className="title"
    titulo.innerText=text;
    containerHTML.appendChild(titulo)
}