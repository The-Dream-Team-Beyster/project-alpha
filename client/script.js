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
function showFeedback(text) {
    feedback.textContent = text;
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
        showFeedback("Correct!");
    } else {
        const idx = countriesList.indexOf(countryDisplay.textContent);
        const countryId = countryIdList[idx];
        const actualCountry = document.querySelector(`#${countryId}`);
        actualCountry.classList.add("incorrect");
        countriesList.splice(idx, 1);
        countryIdList.splice(idx, 1);
        showFeedback("Wrong!");
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

  