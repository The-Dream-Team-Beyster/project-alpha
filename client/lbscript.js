const table = document.querySelector("#table");
const tbody = document.querySelector("#table tbody");

async function fetchHighscore() {
  try {
    const respData = await fetch('http://localhost:3000/users/scores');
    if (respData.ok) {
        const scores = await respData.json();
        return scores;
    } else {
        throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

function displayHighscore() {
  scores = fetchHighscore();
  for (i = 0; i < scores.length; i++) {
            const tr = document.createElement('tr');
            const UserTd = document.createElement('td');
            const HighscoreTd = document.createElement('td');

            UserTd.textContent = scores[i].username
            HighscoreTd.textContent = scores[i].high_score

            tr.appendChild(UserTd)
            tr.appendChild(HighscoreTd)
            table.appendChild(tr)
    }
  }

displayHighscore()

//random overflow guy

let scores = [
    {name: "Player 1", score: 300},
    {name: "Player 2", score: 370},
    {name: "Player 3", score: 500},
    {name: "Player 4", score: 430},
    {name: "Player 5", score: 340},
];

function updateLeaderboardView() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    scores.sort(function(a, b){ return b.score - a.score  });
    let elements = []; // we'll need created elements to update colors later on
    // create elements for each player
    for(let i=0; i<scores.length; i++) {
        let name = document.createElement("div");
        let score = document.createElement("div");
        name.classList.add("name");
        score.classList.add("score");
        name.innerText = scores[i].name;
        score.innerText = scores[i].score;

        let scoreRow = document.createElement("div");
        scoreRow.classList.add("row");
        scoreRow.appendChild(name);
        scoreRow.appendChild(score);
        leaderboard.appendChild(scoreRow);

        elements.push(scoreRow);

    }

    let colors = ["gold", "silver", "#cd7f32"];
    for(let i=0; i < 3; i++) {
        elements[i].style.color = colors[i];
    }
}

updateLeaderboardView();
function randomize() {
    for(var i=0; i<scores.length; i++) {
        scores[i].score = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    }
    // when your data changes, call updateLeaderboardView
    updateLeaderboardView();
}



