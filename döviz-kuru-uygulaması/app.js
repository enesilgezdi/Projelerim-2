const input = document.querySelector("#input");
const firstOption = document.querySelector("#firstCurrencyOption");
const secondOption = document.querySelector("#secondCurrencyOption");
const resultInput = document.querySelector("#result");
const btn = document.querySelector("#btn")

const currency = new Currency();

runEventListeners()

function runEventListeners(){
    btn.addEventListener("click" , exchange)
}

function exchange (){
    const amountInput = Number(input.value.trim());
    const firstOptionValue = firstOption.options[firstOption.selectedIndex].textContent;
    const secondOptionValue = secondOption.options[secondOption.selectedIndex].textContent;


    currency.exchange(amountInput , firstOptionValue , secondOptionValue)
    .then((result)=>{
        resultInput.value = result.toFixed(3);
    })
}