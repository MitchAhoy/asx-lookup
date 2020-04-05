const apiKey = '6H9KFYV6QB4V95H4'
const fetchUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MLT.AX&apikey=6H9KFYV6QB4V95H4'
const button = document.querySelector('.btn')

let data;
function getData() {
    fetch(fetchUrl)
        .then(res => res.json())
        .then(obj => data = obj['Time Series (Daily)'])
}

button.addEventListener('click', function(e) {
    getData()
    let html = ''
    for (const entry in data) {
        console.log(entry)
        html += `date: ${entry} <br>`
        document.querySelector('.data').innerHTML = html
    
}
    
})





























