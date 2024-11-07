const currencyEL_one = document.getElementById('currency-one');
const amountEL_one = document.getElementById('amount-one');
const currencyEL_two = document.getElementById('currency-two');
const amountEL_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const  swap = document.getElementById('swap');

// Fetch exchange rate and update the DOM
function calculate() {
    const currency_one = currencyEL_one.value;
    const currency_two = currencyEL_two.value;

    fetch ( `https://v6.exchangerate-api.com/v6/6f32e952d3358113d5f2815d/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const rate = data.conversion_rates[currency_two];
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEL_two.value = (amountEL_one.value * rate).toFixed(2);
        });
}


// Add event listeners
currencyEL_one.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
currencyEL_two.addEventListener('change', calculate);
amountEL_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const tempCurrValue = currencyEL_one.value;
    currencyEL_one.value = currencyEL_two.value;
    currencyEL_two.value = tempCurrValue;
    calculate();

})


calculate();




