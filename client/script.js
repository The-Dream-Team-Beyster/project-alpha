const countryDisplay = document.querySelector("#country-display");
const score = document.querySelector("#score");
const next = document.querySelector("#next-btn");
const countries = [...document.querySelectorAll(".allPaths")];
const feedback = document.querySelector("#feedback"); 
const logout = document.querySelector('.login')
let scoreNum = 0;

const countriesList = [];
const countryIdList = [];
const funFacts = [];

async function fetchCountry() {
    try {
        const respData = await fetch(`http://localhost:3000/location/GetAllCountries`);

        if (respData.ok) {
            const allCountryNames = await respData.json();
            console.log(allCountryNames)
            for(i = 0; i < allCountryNames.length; i++){
                countriesList.push(allCountryNames[i].name);
                countryIdList.push(allCountryNames[i].country_id);
                funFacts.push(allCountryNames[i].funfact);
            }
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


async function getCountry(name) {
    let funFactContent = ''
    if(countryDisplay.textContent === name.target.attributes[3].textContent){
        scoreNum += 1;
        name.target.classList.add("correct");
        score.textContent = `Score : ${scoreNum}`;
        const idx = countriesList.indexOf(countryDisplay.textContent);
        funFactContent = funFacts[idx]
        countriesList.splice(idx, 1);
        countryIdList.splice(idx, 1);
        funFacts.splice(idx, 1);
        showFeedback("Correct!", true);
    } else {
        const idx = countriesList.indexOf(countryDisplay.textContent);
        const countryId = countryIdList[idx];
        const actualCountry = document.querySelector(`#${countryId}`);
        actualCountry.classList.add("incorrect");
        funFactContent = funFacts[idx]
        countriesList.splice(idx, 1);
        countryIdList.splice(idx, 1);
        funFacts.splice(idx, 1);
        showFeedback("Wrong!", false);
    }
    const funFact = document.querySelector('#fun-fact')
    funFact.textContent = funFactContent
    // When game is over
    if (countriesList.length === 0) {
        const options = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: scoreNum,
                token: localStorage.token
            })
        }

        const response = await fetch(`http://localhost:3000/users/`, options);
        const data = await response.json();
    
        if (response.status == 200) {
            console.log("updated!")
        } else {
            alert(data.error);
        }
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
next.addEventListener("click", skip() )
    
async function skip() {
    const currentName = countryDisplay.textContent;
    const idx = countriesList.indexOf(currentName);

    const countryId = countryIdList[idx];
    const currentCountry = document.querySelector(`#${countryId}`);
    currentCountry.classList.add("incorrect"); 
    countriesList.splice(idx, 1);
    countryIdList.splice(idx, 1);

   
    if (countriesList.length === 0) {
        const options = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: scoreNum,
                token: localStorage.token
            })
        }

        const response = await fetch(`http://localhost:3000/users/`, options);
        const data = await response.json();
    
        if (response.status == 200) {
            console.log("updated!")
        } else {
            alert(data.error);
        }        
        setTimeout(() => {
            const restart = confirm(`Well done! Your final score is ${scoreNum}. Press OK to restart.`);
            if (restart) location.reload();
        }, 500);
        return;
    }

    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    countryDisplay.textContent = randomCountry;
};

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.assign('./client/login/login.html')
})