google.charts.load('current', { packages: ['corechart', 'line'] });
const si = OS.getSiObj();
var cpuLoadData = ([
    ['Tempo em segundos', '% de Utilização'],
    [1, 0]
])
var cpuLoadCoresData = [];
var tempo = 1;

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
        let primeiroGraficoCpu = google.visualization.arrayToDataTable(([
            ['Tempo em segundos', '% de Utilização'],
            [1, 0]
        ]));
        drawAreaChart(primeiroGraficoCpu, 'chart_div_cpu_load');
        si.currentLoad().then((data) => {
            cpuLoadCoresData = [['Tempo', ...data.cpus.map((item, index) => { return `Núcleo ${index}` })], [tempo, ...data.cpus.map((item) => {
                return item.load;
            })]];

            setObserver();
        })

    });

})

si.getDynamicData().then(data => {
    console.log(data)
})

const setObserver = () => {
    valueObject = {
        currentLoad: 'currentLoad,cpus'
    }
    let observer = si.observe(valueObject, 1000, usersCallback);
    setTimeout(() => {
        clearInterval(observer)
    }, 60000);
}

function usersCallback(data) {
    cpuLoadCoresData = [...cpuLoadCoresData, [tempo, ...data.currentLoad.cpus.map((item) => {
        return item.load==0?1:item.load;
    })]];
    cpuLoadData = [...cpuLoadData, [tempo, data.currentLoad.currentLoad.toFixed(2)]];
    drawAreaChart(google.visualization.arrayToDataTable(cpuLoadData), 'chart_div_cpu_load');
    drawLineChart(google.visualization.arrayToDataTable(cpuLoadCoresData, false), 'chart_div_cpu_load_nucleo')
    let usoCpuSpan = document.getElementById('uso_cpu_span');
    let tempoCpuSpan = document.getElementById('tempo_cpu_span');
    usoCpuSpan.innerHTML = `${data.currentLoad.currentLoad.toFixed(2)}%`;
    tempoCpuSpan.innerHTML = tempo;
}


function drawAreaChart(data, divId) {
    var options = {
        title: 'Utilização da CPU ao longo do tempo',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.AreaChart(document.getElementById(divId));
    chart.draw(data, options);
}
function drawLineChart(data, divId) {
    var options = {
        title: 'Utilização de cada núcleo',
        series: {
            1: { curveType: 'function' }
        },
        legend: { position: 'bottom' },
        hAxis: {
            title: '% de Utilização'
          }
    };
    var chart = new google.visualization.LineChart(document.getElementById(divId));
    chart.draw(data, options);
}