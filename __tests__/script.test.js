/**
 * @jest-environment jsdom
 */

let script;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="game-input">
      <h1 id="country-display"></h1>
      <button id="next-btn">Next Question</button>
      <p id="score">Score: 0</p>
    </div>
    <div id="europe_map"></div>
  `;

  const europeMap = document.querySelector("#europe_map");

 
  for (let i = 0; i < 3; i++) {
    const country = document.createElement("div");
    country.classList.add("allPaths");
    country.setAttribute("attr0", `x${i}`);
    country.setAttribute("attr1", `y${i}`);
    country.setAttribute("id", `country${i}`);           // attributes[2]
    country.setAttribute("name", `Country${i}`);         // attributes[3]
    Object.defineProperty(country.attributes[3], "textContent", { value: `Country${i}` });
    europeMap.appendChild(country);
  }

  script = require("../client/script.js");
});

afterEach(() => {
  jest.resetModules();
});

test("next button updates country display", () => {
  const nextBtn = document.querySelector("#next-btn");
  const display = document.querySelector("#country-display");
  expect(display.textContent).toBe("");
  nextBtn.click();
  expect(display.textContent).not.toBe("");
});

test("clicking correct country increases score", () => {
  const display = document.querySelector("#country-display");
  display.textContent = "Country0";
  document.querySelector("#country0").click();
  const scoreEl = document.querySelector("#score");
  expect(scoreEl.textContent).toBe("Score : 1");
  expect(document.querySelector("#country0").classList.contains("correct")).toBe(true);
});

test("country display updates after clicking next multiple times", () => {
  const display = document.querySelector("#country-display");
  const nextBtn = document.querySelector("#next-btn");
  nextBtn.click();
  const first = display.textContent;
  nextBtn.click();
  const second = display.textContent;
  expect(second).not.toBe(first);
});

test("score element displays 0 initially", () => {
  const scoreEl = document.querySelector("#score");
  expect(scoreEl.textContent).toBe("Score: 0");
});


test("country display is empty initially", () => {
  const display = document.querySelector("#country-display");
  expect(display.textContent).toBe("");
});
