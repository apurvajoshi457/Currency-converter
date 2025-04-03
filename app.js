const BASE_URL = "https://api.exchangerate-api.com/v4/latest"; 
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);

        select.addEventListener("change", (event) => {
            updateFlag(event.target);
        });
    }
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};


btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);

    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value}`; 
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.rates[toCurr.value];  
        let finalAmount = (amtVal * rate).toFixed(2);

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate!";
        console.error("API Error:", error);
    }
});
