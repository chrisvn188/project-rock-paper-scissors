const SHAPES = ["ROCK", "PAPER", "SCISSORS"];
const FINAL_SCORE = 5;
let computerSelection = "";
let playerSelection = "";
let computerScore = 0;
let playerScore = 0;
let roundWinner = "";

const btns = document.querySelectorAll('.btn');
const playerWeaponBtns = document.querySelectorAll(".h-btn");
const tinkSound = document.querySelector(`audio[data-sound = "tink"]`);
const playerScoreText = document.querySelector(".human-score");
const computerScoreText = document.querySelector(".aliens-score");
const battleField = document.querySelector(".battle-field");
const battleFieldText = document.querySelector(".battle-field-text");

function getRandomComputerSelection() {
  let randomNumber = Math.floor(Math.random() * SHAPES.length);
  switch (randomNumber) {
    case 0:
      return SHAPES[0];
      break;
    case 1:
      return SHAPES[1];
      break;
    case 2:
      return SHAPES[2];
      break;
    default:
      console.log("Something goes wrong!!!");
  }
}

function getPlayerSelectionEachRound(e) {
  return e.target.getAttribute("data-selection");
}

function removeClassFocused(e) {
  e.target.classList.remove("focused");
}

function findRoundWinner(playerPlay, computerPlay) {
  if (playerPlay === computerPlay) {
    return "Oops! It's a tie";
  } else if (
    (playerPlay === "ROCK" && computerPlay === "SCISSORS") ||
    (playerPlay === "PAPER" && computerPlay === "ROCK") ||
    (playerPlay === "SCISSORS" && computerPlay === "PAPER")
  ) {
    playerScore++;
    return "Human";
  } else if (
    (playerPlay === "ROCK" && computerPlay === "PAPER") ||
    (playerPlay === "PAPER" && computerPlay === "SCISSORS") ||
    (playerPlay === "SCISSORS" && computerPlay === "ROCK")
  ) {
    computerScore++;
    return "Aliens";
  }
}

function updateScore() {
  playerScoreText.textContent = `${playerScore}`;
  computerScoreText.textContent = `${computerScore}`;
}

function playRound(e) {
  computerSelection = getRandomComputerSelection();
  playerSelection = getPlayerSelectionEachRound(e);

  let focusedComputerBtn = document.querySelector(
    `.a-btn[data-selection = "${computerSelection}"]`
  );
  let focusedPlayerBtn = document.querySelector(
    `.h-btn[data-selection = "${playerSelection}"]`
  );

  focusedPlayerBtn.classList.add("focused");
  tinkSound.play();
  focusedComputerBtn.classList.add("focused");
  
  // Display Round Winner
  roundWinner = findRoundWinner(playerSelection, computerSelection);
  battleFieldText.textContent = `Round Winner: ${roundWinner}`;

  updateScore();
  getFinalWinner();
}

function getFinalWinner() {
  if (playerScore === FINAL_SCORE || computerScore === FINAL_SCORE) {
    playerWeaponBtns.forEach((btn) => (btn.disabled = true));
    if (playerScore > computerScore) {
      battleFieldText.textContent = `Whoohoos You defended aliens successfully. The world is all yours.`;
    } else if (playerScore < computerScore) {
      battleFieldText.textContent = `Oops!!! Aliens is new world dominators`;
    }
  }
}

playerWeaponBtns.forEach((btn) => btn.addEventListener("click", playRound));
btns.forEach((btn) =>
  btn.addEventListener("transitionend", removeClassFocused)
);
