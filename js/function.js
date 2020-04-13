function createP(message, style) {
    const p = document.createElement('p')
    p.innerHTML = message
    p.classList.add(`text-${style}`)
    return p
}

// Get data from API
async function getData() {

    if (ticker === '') {
        return
    }

    const fetchUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}.AX&apikey=6H9KFYV6QB4V95H4`

    const response = await fetch(fetchUrl)
    if (!response.ok) {
        throw new Error("HTTP error " + response.status)
    }
    const object = await response.json()

    // Error handling
    if (object['Note']) {
        chartInfo.appendChild(createP('Too many requests - max 5 per minute', 'danger', 'error-message'))
        setTimeout(function () {chartInfo.removeChild(document.querySelector('.text-danger'))}, 3000)
    } else if (object['Error Message']) {
        chartInfo.appendChild(createP('API does not support this company', 'danger', 'error-message'))
        setTimeout(function () {chartInfo.removeChild(document.querySelector('.text-danger'))}, 3000)
    } 

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

    const chart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: plotData.xlabels,
            datasets: [
                {
                    label: 'Price',
                    data: plotData.price.close,
                    backgroundColor: '#007bff52',
                    borderColor: '#007bff'
                }
            ],
        },
        options: {}
    })

    // Search with button
    document.querySelector('.btn-submit').addEventListener('click', function (e) {
        ticker = searchText.value
        chart.destroy()
        loadContent()
    })

}

// Select from drop down menu
function selectStock(name) {

    ticker = name

    Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.chart.canvas.id === "myChart") {
            instance.destroy();
            return;
        }
    });

    loadContent()
}

// Load DOM Content
async function loadContent() {

    const data = await getData()

    document.querySelector('.stock-name').innerHTML = `${data.rawData['Meta Data']['2. Symbol']}`
    document.querySelector('.stock-info').innerHTML = `Last Updated: ${data.rawData['Meta Data']['3. Last Refreshed']}`

    chartIt()
}

