// setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;

document.querySelector("footer strong").innerHTML = gameName;
// Setting Game Options

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1; // inital value
// Manage Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
const progressText = document.querySelector(".progress-header span");
const progressDots = document.querySelectorAll(".progress-dots span");
function updateProgress(tries) {
  progressText.innerHTML = `${tries}/${numberOfTries}`;

  progressDots.forEach((dot, index) => {
    dot.classList.toggle("active", index < tries);
  });
}
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let messageArea = document.querySelector(".message");

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;

      input.setAttribute("maxlength", 1);
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const inputIsDisabled = document.querySelectorAll(".disabled-inputs input");
  inputIsDisabled.forEach((input) => {
    input.disabled = true;
  });
  // convert input to Uppercase
  const inputs = document.querySelectorAll(".inputs input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1]; // target next input
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(this);
      // console.log(currentIndex)
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const previousInput = currentIndex - 1;
        if (previousInput >= 0) inputs[previousInput].focus();
      }
    });
  });
}
const guessButton = document.querySelector(".check");
let hintNumber = 3;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", function () {
  const currentTryInputs = document.querySelectorAll(
    `.try-${currentTry} input`,
  );
  for (let i = 0; i < currentTryInputs.length; i++) {
    if (currentTryInputs[i].value === "") {
      currentTryInputs[i].value = wordToGuess[i].toUpperCase();
      currentTryInputs[i].disabled = true;
      currentTryInputs[i].classList.add("yes-in-place");
      hintNumber--;
      hintButton.innerHTML = `💡 Hint (${hintNumber} left)`;
      if (hintNumber === 0) {
        hintButton.disabled = true;
      }
      break;
    }
  }
});
const newGameButton = document.querySelector("#new-game");
newGameButton.addEventListener("click", function () {
  window.location.reload();
});
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);
function handleGuesses() {
  let successGuess = true; // normal guess but if someone put a letter diff or in another place will be false

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`,
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1]; // start of the loop is 0
    // game logic
    if (letter === actualLetter) {
      // letter is correct and in plac
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // letter is corrct and not in place
      inputField.classList.add("not-in-place");
      successGuess = false;
      // empty input
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  // check if user win or lose
  if (successGuess) {
    messageArea.innerHTML = `You win The Word Is <span> ${wordToGuess}</span>`;
    // add disabled class to all inputs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      tryDiv.classList.add("disabled-inputs");
    });
    // disable guess button
    guessButton.disabled = true;
  } else {
    // check if user lose
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");

    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`,
    );
    currentTryInputs.forEach((input) => {
      input.disabled = true;
    });
    currentTry++;
    updateProgress(currentTry - 1);

    if (currentTry <= numberOfTries) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");

      const nextTryInputs = document.querySelectorAll(
        `.try-${currentTry} input`,
      );

      nextTryInputs.forEach((input) => {
        input.disabled = false;
      });

      const firstInput = document.querySelector(
        `#guess-${currentTry}-letter-1`,
      );

      firstInput.focus();
    } else {
      guessButton.disabled = true;

      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}
window.onload = function () {
  generateInput();
};
