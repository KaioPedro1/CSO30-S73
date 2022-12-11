google.charts.load('current', { packages: ['corechart', 'line'] });
const si = OS.getSiObj();
//VARIAVEIS GLOBAIS
var tempo = 1;
var cpuLoadData = ([
    ['Tempo em segundos', '% de Utilização'],
    [1, 0]
]);
var memLoadData = ([
    ['Tempo em segundos', '% de Utilização'],
    [1, 0]
]);
//
//jogar para um arquivo separado, é só um contador para fazer o eixo y do grafico
const asyncCounter = async () => {
    while (true) {
        await new Promise((resolve) => {
            setTimeout(() => {
                tempo++;
                resolve()
            }, 1000);
        })
    }
}
asyncCounter();
//
//após o conteudo do dom ser carregado, chama as funções
window.addEventListener('DOMContentLoaded', () => {
    let openShell = OS.getShell();
    document.getElementById("btnShell").addEventListener("click", () => openShell());
    google.charts.setOnLoadCallback(() => {
        let primeiroGraficoCPU = google.visualization.arrayToDataTable(cpuLoadData);
        let primeiroGraficoMEM = google.visualization.arrayToDataTable(memLoadData);
        let loadingCPU = document.getElementById('loadingCPU');
        let loadingMem = document.getElementById('loadingMem');
        loadingCPU.remove();
        loadingMem.remove();
        drawAreaChart(primeiroGraficoCPU, 'chart_div_cpu');
        drawAreaChart(primeiroGraficoMEM, 'chart_div_mem');
        setObserver();

    });
});

//observer e callback do observer, TO-DO: jogar para um arquivo separado junto com o contador
const setObserver = () => {
    valueObject = {
        mem: 'total,used',
        currentLoad: 'currentLoad',
    }
    let observer = si.observe(valueObject, 1000, usersCallback);
    setTimeout(() => {
        clearInterval(observer)
    }, 10000);
};
function usersCallback(data) {
    let memUsedPercentage = ((data.mem.used / data.mem.total) * 100).toFixed(2);
    let cpuUsed = data.currentLoad.currentLoad.toFixed(2);

    memLoadData = [...memLoadData, [tempo, memUsedPercentage]];
    cpuLoadData = [...cpuLoadData, [tempo, cpuUsed]]

    drawAreaChart(google.visualization.arrayToDataTable(cpuLoadData), 'chart_div_cpu');
    drawAreaChart(google.visualization.arrayToDataTable(memLoadData), 'chart_div_mem');
}
//
//desenha o chart
function drawAreaChart(data, divId) {
    let options = {
        curveType: 'function',
        vAxis: {
            minValue: 0,
            maxValue: 100
        },
        legend: { position: 'bottom' }
    };
    let chart = new google.visualization.AreaChart(document.getElementById(divId));
    chart.draw(data, options);
}