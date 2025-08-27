const countryDisplay = document.querySelector("#country-display");
const score = document.querySelector("#score");
const next = document.querySelector("#next-btn");
const countries = [...document.querySelectorAll(".allPaths")]
let scoreNum = 0

const countriesList = [];
const countryIdList = [];

countries.forEach( country => {
    countriesList.push(country.attributes[3].textContent)
    countryIdList.push(country.attributes[2].textContent)
    //country.addEventListener("onclick", displayName(country.attributes[3].textContent))
})

async function fetchCountry() {
    try {
        const respData = await fetch(`http://localhost:4000/location/GetAllCountries`);

        if (respData.ok) {
            const allCountryNames = await respData.json();
            console.log(allCountryNames);
        } else {
            throw "Something has gone wrong with one of the API requests";
        }
    } catch (e) {
        console.log(e);
    }
}

fetchCountry()

countries.forEach((e) => {
        e.addEventListener("click", (i) => {
            getCountry(i)
        })
})

next.addEventListener("click", () => {
    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    countryDisplay.textContent = randomCountry; 
});

function getCountry(name) {
    if(countryDisplay.textContent === name.target.attributes[3].textContent){
        scoreNum += 1
        name.target.classList.add("correct")
        score.textContent = `Score : ${scoreNum}`
        const idx = countriesList.indexOf(countryDisplay.textContent)
        countriesList.splice(idx, 1)
        countryIdList.splice(idx, 1)
    }
    else{
        const idx = countriesList.indexOf(countryDisplay.textContent)
        countryId = countryIdList[idx]
        console.log(countryId)
        actualCountry = document.querySelector(`#${countryId}`)
        console.log(actualCountry)
        actualCountry.classList.add("incorrect")
        countriesList.splice(idx, 1)
        countryIdList.splice(idx, 1)
    }
    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    countryDisplay.textContent = randomCountry; 
}
