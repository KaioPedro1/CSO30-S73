google.charts.load('current', { packages: ['corechart', 'line'] });
const si = OS.getSiObj();

var tempo = 1;
var memLoadData = ([
    ['Tempo em segundos', '% de Utilização'],
    [1, 0]
])
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

window.addEventListener('DOMContentLoaded', () => {
    google.charts.setOnLoadCallback(() => {
        let primeiroGraficoRam = google.visualization.arrayToDataTable(memLoadData);

        drawAreaChart(primeiroGraficoRam, 'chart_div_ram_load');
        setObserver();
    });

})

si.getDynamicData().then(data => console.log(data))

function usersCallback(data) {
    let usedPercentage = ((data.mem.used / data.mem.total) * 100).toFixed(2)
    let totalEmGB = Math.ceil(data.mem.total / 1073741824);
    let totalLivreEmGB = (data.mem.available / 1073741824).toFixed(2);
    memLoadData = [...memLoadData, [tempo, usedPercentage]]
    drawAreaChart(google.visualization.arrayToDataTable(memLoadData), 'chart_div_ram_load');
    atualizaHTMLRAM(usedPercentage, tempo, totalEmGB, totalLivreEmGB);
}
const atualizaHTMLRAM = (used, tempo, totalGB, disponivelGB) => {
    let usoRamSpan = document.getElementById('uso_ram_span');
    let tempoCpuSpan = document.getElementById('tempo_ram_span');
    let tamanhoRamSpan = document.getElementById('tamanho_ram_span');
    let disponivelRamSpan = document.getElementById('disponivel_ram_span');
    usoRamSpan.innerHTML = `${used}%`;
    tempoCpuSpan.innerHTML = tempo;
    tamanhoRamSpan.innerHTML = `${totalGB}GB`;
    disponivelRamSpan.innerHTML = `${disponivelGB}GB`
}
const setObserver = () => {
    valueObject = {
        mem: 'total,used,available'
    }
    let observer = si.observe(valueObject, 1000, usersCallback);
    setTimeout(() => {
        clearInterval(observer)
    }, 60000);
}

function drawAreaChart(data, divId) {
    let options = {
        title: 'Utilização da memória RAM ao longo do tempo',
        curveType: 'function',
        legend: { position: 'bottom' },
        vAxis: {
            minValue: 0,
            maxValue: 100
        }
    };
    let chart = new google.visualization.AreaChart(document.getElementById(divId));
    chart.draw(data, options);
}