let ticker = ''
const myChart = document.getElementById('myChart').getContext('2d')
const searchText = document.querySelector('#search')
const searchBtn = document.querySelector('.btn-submit')
const matchList = document.getElementById('match-list')

loadContent()

// Event listeners
// Search with autocomplete
searchText.addEventListener('input', async function (e) {
    const res = await fetch('../data/asx-info.json')
    const list = await res.json()

    const searchInputText = e.target.value

    let matches = list.filter(function (el) {
        const regex = new RegExp(`^${searchInputText}`, `gi`)
        return el['Company name'].match(regex) || el['ASX code'].match(regex)
    })

    if (searchInputText === '') {
        matches = []
        matchList.innerHTML = ''
    }

    outputHtml(matches)

    function outputHtml(matches) {
        if (matches.length > 0) {
            const html = matches.map(match => `
                    <div class="card card-body search-result" value="${match['ASX code']}" onclick="selectStock('${match['ASX code']}')">
                        <h4>${match['Company name']} (${match['ASX code']}) <div><small>${match['GICS industry group']}</small></div></h4>
                    </div>
                `).join('')
            matchList.innerHTML = html
        }
    }

    // styling position
    if (matches.length === 3) {
        matchList.style.marginTop = '14.8rem'
    } else if (matches.length === 2) {
        matchList.style.marginTop = '11.4rem'
    } else if (matches.length === 1) {
        matchList.style.marginTop = '8rem'
    } else {
        matchList.style.marginTop = '16.8rem'
    }
})

// Show/hide autocomplete
searchText.addEventListener('focus', function () {
    matchList.style.display = 'block'
})
searchText.addEventListener('blur', function () {

    setTimeout(function () { matchList.style.display = 'none' }, 500)

})






















