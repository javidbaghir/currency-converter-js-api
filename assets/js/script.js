const dropList = document.querySelectorAll('#drop-list')
const fromSelect = document.querySelector('#from')
const toSelect = document.querySelector('#to')
const convertBtn = document.querySelector('#convert-btn')
const swapBtn = document.querySelector('#swap-btn')
const amount = document.querySelector('#amount')
const fromResult = document.querySelector('#from-result')
const toResult = document.querySelector('#to-result')

async function loadCountrySymbols() {
    let url = "https://api.exchangerate.host/list?access_key=930c1acacf000af6ad911312965bdfe5"
    const result = await fetch(url)
    const data = await result.json()
    let symbolList = data.currencies
    showData(symbolList);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCountrySymbols()
})

function showData(symbols) {
    const symbolOnly = Object.keys(symbols)

    let html = "";

    symbolOnly.forEach(symbol => {
        html += `<option data-id="${symbol}">${symbol}</option>`
    })

    fromSelect.innerHTML = html
    fromSelect.querySelectorAll('option').forEach(option => {
        if (option.dataset.id == "USD") option.selected = 'selected'
    }) 

    toSelect.innerHTML = html
    toSelect.querySelectorAll('option').forEach(option => {
        if (option.dataset.id == "EUR") option.selected = 'selected'
    }) 
}

amount.addEventListener('keyup', function () {
    let amountInput = Number(this.value)
    if(!amountInput) amount.style.borderColor = '#de3f44'
    else amount.style.borderColor = '#c6c7c9' 
})

convertBtn.addEventListener('click', function () {
    let fromCurrency = fromSelect.value
    let toCurrency = toSelect.value
    let amountVal = Number(amount.value)
   if(amountVal) getConvertedData(fromCurrency, toCurrency, amountVal)
    
})

async function getConvertedData(from, to, amt) {
    let API_URL = `https://api.exchangerate.host/convert?access_key=930c1acacf000af6ad911312965bdfe5&from=${from}&to=${to}&amount=${amt}`
    const result = await fetch(API_URL)
    const data = await result.json();
    
    fromResult.textContent = Number(amount.value) + " " + from
    toResult.textContent = Number(data.result.toFixed(2)) + " " + to 
}

swapBtn.addEventListener('click', function () {
    let fromIndex = from.selectedIndex;
    let toIndex = to.selectedIndex;

    from.querySelectorAll('option')[toIndex].selected = 'selected'
    to.querySelectorAll('option')[fromIndex].selected = 'selected'
})