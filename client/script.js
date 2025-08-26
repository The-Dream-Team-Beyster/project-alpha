const countryDisplay = document.querySelector("#country-display");
const score = document.querySelector("#score");
const next = document.querySelector("#next-btn");

const countries = ["France", "Brazil", "Japan", "Canada", "India"];

next.addEventListener("click", () => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    countryDisplay.textContent = randomCountry; 
});
