google.charts.load('current', { packages: ['corechart', 'line'] });
const si = OS.getSiObj();
let cpuLoadData = ([
    ['Tempo em segundos', '% de Utilização'],
    [1, 0]
])
let tempo = 1;

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
        let primeiroGraficoCpu = google.visualization.arrayToDataTable(cpuLoadData);
        drawChart(primeiroGraficoCpu, 'chart_div_cpu_load');
    });

})

si.getDynamicData().then(data => {
    console.log(data)
})

// define all values, you want to get back
valueObject = {
    currentLoad: 'currentLoad,avgLoad'
}

function usersCallback(data) {
    cpuLoadData = [...cpuLoadData, [tempo, data.currentLoad.currentLoad.toFixed(2)]];
    drawChart(google.visualization.arrayToDataTable(cpuLoadData),'chart_div_cpu_load');
    let usoCpuSpan = document.getElementById('uso_cpu_span');
    let tempoCpuSpan = document.getElementById('tempo_cpu_span');
    usoCpuSpan.innerHTML=`${data.currentLoad.currentLoad.toFixed(2)}%`;
    tempoCpuSpan.innerHTML=tempo;
}

// now define the observer function
let observer = si.observe(valueObject, 1000, usersCallback);

// In this example we stop our observer function after 10 seconds
setTimeout(() => {
    clearInterval(observer)
}, 60000);


function drawChart(data,divId) {
    var chart = new google.visualization.AreaChart(document.getElementById(divId));
    chart.draw(data);
}