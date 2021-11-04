const SHAPES = ["ROCK", "PAPER", "SCISSORS"];
const FINAL_SCORE = 5;
let computerSelection = "";
let playerSelection = "";
let computerScore = 0;
let playerScore = 0;

const btnPlay = document.querySelector(".btn-play");
const playerBtns = document.querySelectorAll(".player-btn");
const computerBtns = document.querySelectorAll(".computer-btn");
const scoreBoard = document.querySelector(".score-display");
const hintText = document.querySelector(".hint-text");
const sound = document.querySelector('audio');

function getComputerSelectionAutomatically() {
  let randomNumber = Math.floor(Math.random() * SHAPES.length);
  switch (randomNumber) {
    case 0:
      return "ROCK";
      break;
    case 1:
      return "PAPER";
      break;
    case 2:
      return "SCISSORS";
      break;
  }
}

function getPlayerSelectionWhenButtonClicked(e) {
  sound.play();
  return e.target.getAttribute("data-selection");
}

function compareResultsAndCalculateScoreEachRound(playerPlay, computerPlay) {
  if (playerPlay === computerPlay) {
    hintText.textContent = "It's a tie!";
    return;
  } else if (
    (playerPlay === "ROCK" && computerPlay === "SCISSORS") ||
    (playerPlay === "PAPER" && computerPlay === "ROCK") ||
    (playerPlay === "SCISSORS" && computerPlay === "PAPER")
  ) {
    hintText.textContent = "You wins this round!";
    playerScore++;
  } else if (
    (computerPlay === "ROCK" && playerPlay === "SCISSORS") ||
    (computerPlay === "PAPER" && playerPlay === "ROCK") ||
    (computerPlay === "SCISSORS" && playerPlay === "PAPER")
  ) {
    hintText.textContent = "Computer wins this round!";
    computerScore++;
  }
}

function updateScoreBoard() {
  scoreBoard.textContent = `${playerScore} - ${computerScore}`;
  if (playerScore === FINAL_SCORE || computerScore === FINAL_SCORE) {
    playerBtns.forEach((btn) => (btn.disabled = true));
    btnPlay.textContent = "Restart Game";
    if (playerScore === computerScore) {
      hintText.textContent = "Final: Draw";
    } else if (playerScore > computerScore) {
      hintText.textContent = "Final: Player Wins";
    } else if (playerScore < computerScore) {
      hintText.textContent = "Final: Computer Wins";
    }
  }
}

function playRound(e) {
  btnPlay.textContent = "Restart Game";

  playerSelection = getPlayerSelectionWhenButtonClicked(e);
  computerSelection = getComputerSelectionAutomatically();

  let focusedPlayerBtn = document.querySelector(
    `.player-btn[data-selection = "${playerSelection}"]`
  );
  let focusedComputerBtn = document.querySelector(
    `.computer-btn[data-selection = "${computerSelection}"]`
  );

  // When button clicked, add focused class
  focusedComputerBtn.classList.add("focused");
  focusedPlayerBtn.classList.add("focused");

  compareResultsAndCalculateScoreEachRound(playerSelection, computerSelection);
  updateScoreBoard();

  // When transition end remove focused class
  playerBtns.forEach((btn) =>
    btn.addEventListener("transitionend", (e) => {
      e.target.classList.remove("focused");
    })
  );
  computerBtns.forEach((btn) =>
    btn.addEventListener("transitionend", (e) => {
      e.target.classList.remove("focused");
    })
  );
}

function restartGame() {
  computerScore = 0;
  playerScore = 0;
  hintText.textContent = "";
  updateScoreBoard();
  playerBtns.forEach((btn) => (btn.disabled = false));
}

playerBtns.forEach((btn) => btn.addEventListener("click", playRound));
btnPlay.addEventListener("click", restartGame);
