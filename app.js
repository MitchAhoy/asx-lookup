const apiKey = '6H9KFYV6QB4V95H4'
const fetchUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MLT.AX&apikey=6H9KFYV6QB4V95H4'
const button = document.querySelector('.btn')
const myChart = document.getElementById('myChart').getContext('2d')
let data = {}



// Get data from API
async function getData() {
    fetch(fetchUrl)
        .then(response => response.json())
        .then(object => {
            data.rawData = object
            data.xlabels = Object.keys(object['Time Series (Daily)'])
            data.priceData = Object.entries(object["Time Series (Daily)"])
            data.priceOpen = Object.entries(object["Time Series (Daily)"]).forEach(function(day) {data.priceOpen.push(day[1]['1. open'])})
            // data.price.open = Object.entries(object["Time Series (Daily)"]).forEach(function(day) {open.push(day[1]['2. high'])})
            // data.price.open = Object.entries(object["Time Series (Daily)"]).forEach(function(day) {open.push(day[1]['3. low'])})
            // data.price.open = Object.entries(object["Time Series (Daily)"]).forEach(function(day) {open.push(day[1]['4. close'])})
            // data.price.open = Object.entries(object["Time Series (Daily)"]).forEach(function(day) {open.push(day[1]['5. adjusted close'])})

        })
        .catch(err => console.log(err))
}

// Draw chart
async function chartIt() {
    await getData()

    const priceChart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Price',
                data: [1,2,3,4,5,6,7], 
            }]
        },
        options: {}
    })
    }

chartIt()

// open
// high
// low
// close
// adjusted close


    





























