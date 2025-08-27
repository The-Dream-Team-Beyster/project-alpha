const countryDisplay = document.querySelector("#country-display");
const score = document.querySelector("#score");
const next = document.querySelector("#next-btn");
const countries = [...document.querySelectorAll(".allPaths")];
const feedback = document.querySelector("#feedback"); 
let scoreNum = 0;

const countriesList = [];
const countryIdList = [];

countries.forEach(country => {
    countriesList.push(country.attributes[3].textContent);
    countryIdList.push(country.attributes[2].textContent);
});

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
        getCountry(i);
    });
});

next.addEventListener("click", () => {
    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    countryDisplay.textContent = randomCountry; 
});

// changes start game text to next country
next.addEventListener("click", () => {
    
    next.textContent = "Next Country";
}, { once: true });

// Shows feedback
function showFeedback(text, correct) {
    feedback.textContent = text;
    feedback.style.color = correct ? "green" : "red";  
    feedback.style.display = "block";       
    setTimeout(() => {
        feedback.style.display = "none";     
    }, 3000);
}


function getCountry(name) {
    if(countryDisplay.textContent === name.target.attributes[3].textContent){
        scoreNum += 1;
        name.target.classList.add("correct");
        score.textContent = `Score : ${scoreNum}`;
        const idx = countriesList.indexOf(countryDisplay.textContent);
        countriesList.splice(idx, 1);
        countryIdList.splice(idx, 1);
        showFeedback("Correct!", true);
    } else {
        const idx = countriesList.indexOf(countryDisplay.textContent);
        const countryId = countryIdList[idx];
        const actualCountry = document.querySelector(`#${countryId}`);
        actualCountry.classList.add("incorrect");
        countriesList.splice(idx, 1);
        countryIdList.splice(idx, 1);
        showFeedback("Wrong!", false);
    }

    // When game is over
    if (countriesList.length === 0) {
        setTimeout(() => {  
            const restart = confirm(`Well done! Your final score is ${scoreNum}. Press OK to restart.`);
            if (restart) {
                location.reload(); 
            }
        }, 500); 
        return;
    }

    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    countryDisplay.textContent = randomCountry; 
}

// When the button is clicked instead of an answer
next.addEventListener("click", () => {
    const currentName = countryDisplay.textContent;
    const idx = countriesList.indexOf(currentName);

    const countryId = countryIdList[idx];
    const currentCountry = document.querySelector(`#${countryId}`);
    currentCountry.classList.add("incorrect"); 
    countriesList.splice(idx, 1);
    countryIdList.splice(idx, 1);

   
    if (countriesList.length === 0) {
        setTimeout(() => {
            const restart = confirm(`Well done! Your final score is ${scoreNum}. Press OK to restart.`);
            if (restart) location.reload();
        }, 500);
        return;
    }

    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    countryDisplay.textContent = randomCountry;
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.assign('./client/login/login.html')
})