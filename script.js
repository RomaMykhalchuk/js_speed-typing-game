const RANDOM_QUOTE_API =
  "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const arrOfQuote = quoteDisplayElement.querySelectorAll("span");
  const arrValue = quoteInputElement.value.split("");
  let correct = true;
  [...arrOfQuote].forEach((char, index) => {
    const character = arrValue[index];
    if (character == null) {
      char.classList.remove("correct");
      char.classList.remove("incorrect");
      correct = false;
    } else if (character === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.remove("correct");
      char.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    getNextQuote();
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API)
    .then((resposne) => resposne.json())
    .then((data) => data.message);
}

async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((char) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = char;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  setTimer();
}

let startTime;
function setTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
    getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

getNextQuote();
