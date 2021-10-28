// Author: Chi Anh Bui
// Created: Oct 28, 2021
// This program is a game called Rock, Paper and Scissors.

const NUMBER_OF_SHAPES = 3;
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DRAW_TEXT = "DRAW";
const COMPUTER_WINS_TEXT = "COMPUTER WINS";
const HUMAN_WINS_TEXT = "HUMAN WINS";
const WRONG_INPUT_TEXT = "WRONG PLAYER INPUT - NOT COUNT";

let humanScore = 0;
let computerScore = 0;

// A FUNCTION TO GET COMPUTER PLAY AUTOMATICALLY
let getComputerPlay = function () {
  let randomNumber = Math.floor(Math.random() * NUMBER_OF_SHAPES);
  switch (randomNumber) {
    case 0:
      console.log(`Computer choice is ${ROCK}`);
      return ROCK;
      break;
    case 1:
      console.log(`Computer choice is ${PAPER}`);
      return PAPER;
      break;
    case 2:
      console.log(`Computer choice is ${SCISSORS}`);
      return SCISSORS;
      break;
    default:
      return "Something Wrong!";
  }
};

let getPlayerPlay = function () {
  let playerChoice = prompt("Enter a choice - rock, paper or scissors: ");
  if (playerChoice == null || playerChoice == false) {
    alert(WRONG_INPUT_TEXT);
  } else if (
    playerChoice.toUpperCase() !== ROCK &&
    playerChoice.toUpperCase() !== PAPER &&
    playerChoice.toUpperCase() !== SCISSORS
  ) {
    alert(WRONG_INPUT_TEXT);
  } else if (
    playerChoice.toUpperCase() === ROCK ||
    playerChoice.toUpperCase() === PAPER ||
    playerChoice.toUpperCase() === SCISSORS
  ) {
    console.log(`Player choice is ${playerChoice.toUpperCase()}`);
    return playerChoice.toUpperCase();
  }
};
// A FUNCTION TO COMPARE RESULTS EACH ROUND OF THE GAME
let getResults = function (playerChoice, computerChoice) {
  let playerPlay = playerChoice();
  let computerPlay = computerChoice();

  if (playerPlay === computerPlay) {
    return DRAW_TEXT;
  } else if (
    (playerPlay === ROCK && computerPlay === PAPER) ||
    (playerPlay === PAPER && computerPlay === SCISSORS) ||
    (playerPlay === SCISSORS && computerPlay === ROCK)
  ) {
    return COMPUTER_WINS_TEXT;
  } else if (
    (playerPlay === ROCK && computerPlay === SCISSORS) ||
    (playerPlay === PAPER && computerPlay === ROCK) ||
    (playerPlay === SCISSORS && computerPlay === PAPER)
  ) {
    return HUMAN_WINS_TEXT;
  } else return WRONG_INPUT_TEXT;
};

// A FUNCTION TO CALCULATE SCORES AFTER COMPARING RESULTS
let calcScore = function (results) {
  if (results === WRONG_INPUT_TEXT) {
    console.log(WRONG_INPUT_TEXT);
  } else if (results === COMPUTER_WINS_TEXT) {
    computerScore++;
  } else if (results === HUMAN_WINS_TEXT) {
    humanScore++;
  }
};

let game = function (getResults, calcScore) {
  console.log(`--------------------- START ROUND ---------------------`);
  let result = getResults(getPlayerPlay, getComputerPlay);
  calcScore(result);
  console.log(
    `Player's score is ${humanScore} and ${computerScore} for computer.`
  );
  console.log(`--------------------- END ROUND ---------------------`);
};

let showWinner = function (humanScore, computerScore) {
  console.log(`--------------------- FINAL RESULT -------------------`);
  if (humanScore < computerScore) {
    console.log(COMPUTER_WINS_TEXT);
  } else if (humanScore > computerScore) {
    console.log(HUMAN_WINS_TEXT);
  } else console.log(`Human and computer ${DRAW_TEXT}`);
};

let playGame = function () {
  game(getResults, calcScore);
  game(getResults, calcScore);
  game(getResults, calcScore);
  game(getResults, calcScore);
  game(getResults, calcScore);
  showWinner(humanScore, computerScore);
};

// CALL THE PLAY GAME FUNCTION
playGame();
