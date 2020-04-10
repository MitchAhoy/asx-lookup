let ticker = 'MLT'

const myChart = document.getElementById('myChart').getContext('2d')



// Get data from API
async function getData() {
    const fetchUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}.AX&apikey=6H9KFYV6QB4V95H4`

    const response = await fetch(fetchUrl)
    if (!response.ok) {
        throw new Error("HTTP error " + response.status)
    }
    const object = await response.json()

    const data = new Object

    data.rawData = object
    data.xlabels = Object.keys(object['Time Series (Daily)'])


    data.price = new Object

    data.price.open = new Array
    data.price.high = new Array
    data.price.low = new Array
    data.price.close = new Array
    data.price.adjustedClose = new Array
    data.price.volume = new Array
    data.price.dividendAmount = new Array
    data.price.splitCoefficient = new Array

    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.open.push(day[1]['1. open']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.high.push(day[1]['2. high']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.low.push(day[1]['3. low']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.close.push(day[1]['4. close']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.adjustedClose.push(day[1]['5. adjusted close']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.volume.push(day[1]['6. volume']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.dividendAmount.push(day[1]['7. dividend amount']) })
    Object.entries(object["Time Series (Daily)"]).forEach(function (day) { data.price.splitCoefficient.push(day[1]['8. split coefficient']) })



    data.price.open.reverse()
    data.price.high.reverse()
    data.price.low.reverse()
    data.price.close.reverse()
    data.price.adjustedClose.reverse()
    data.price.volume.reverse()
    data.price.dividendAmount.reverse()
    data.price.splitCoefficient.reverse()
    data.xlabels.reverse()

    return data

}

// Draw chart
async function chartIt() {
    const plotData = await getData()

    const low = plotData.price.low

    const chart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: plotData.xlabels,
            datasets: [
                {
                    label: 'Close',
                    data: plotData.price.close
                }
            ],
        },
        options: {}
    })

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }



    document.querySelector('.btn-submit').addEventListener('click', function (e) {
        removeData(chart)
        chart.update()

    })

}

// Load DOM Content

async function loadContent() {

    const data = await getData()

    document.querySelector('.stock-name').innerHTML = `${data.rawData['Meta Data']['2. Symbol']}`
    document.querySelector('.stock-info').innerHTML = `Last Updated: ${data.rawData['Meta Data']['3. Last Refreshed']}`

    chartIt()
}

// Select data
function select() {
    const open = document.querySelector('#open')
    const high = document.querySelector('#high')
    const low = document.querySelector('#low')
    const close = document.querySelector('#close')
    const adjClose = document.querySelector('#adj-close')
    const dividends = document.querySelector('#dividends')



    function updateConfigByMutating(chart) {
        chart.options.title.text = 'new title';
        chart.update();
    }

}



loadContent()


