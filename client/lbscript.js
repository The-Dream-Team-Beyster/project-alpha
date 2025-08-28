const table = document.querySelector("#table");
const tbody = document.querySelector("#table tbody");

async function fetchHighscore() {
  try {
    const respData = await fetch('http://localhost:3000/users/scores');
    if (respData.ok) {
        const scores = await respData.json();
        displayHighscore(scores);
    } else {
        throw "Something has gone wrong with one of the API requests";
    }
  } catch (e) {
    console.log(e);
  }
}

function displayHighscore(scores) {
  for (i = 0; i < scores.length; i++) {
            var row = table.insertRow(i+1)
            var UserTd = row.insertCell(0);
            var HighscoreTd = row.insertCell(1);

            UserTd.innerHTML = scores[i].username
            HighscoreTd.innerHTML = scores[i].high_score
    }
  }

fetchHighscore()
