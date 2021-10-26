const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DRAW = "DRAW";
const COMPUTER_WINS = "COMPUTER WINS";
const HUMAN_WINS = "HUMAN WINS";
const CHOICE = [ROCK, PAPER, SCISSORS];

let humanScore = 0;
let computerScore = 0;


// COMPUTER PLAY AUTOMATICALLY
let computerPlay = function () {
    let comChoiceIndex = Math.floor(Math.random() * CHOICE.length);
    console.log(`Computer choice is ${CHOICE[comChoiceIndex]}`);
    return CHOICE[comChoiceIndex];
};

// PLAYER PLAY
let playerPlay = function () {
    let playerChoice = prompt("Choose a choice for the game - ROCK, PAPER or SCISSORS: ").toUpperCase();
    console.log(`Player choice is ${playerChoice}`)
    return playerChoice;
}

// COMPARE RERULTS
let compareResults = function (playerChoice, computerChoice) {
    let playerPlay = playerChoice();
    let computerPlay = computerChoice();

    if (playerPlay != null && playerPlay != false) {
        if (playerPlay === ROCK && computerPlay === ROCK) {
            return DRAW;
        }
        else if (playerPlay === ROCK && computerPlay === PAPER) {
            return COMPUTER_WINS;
        }
        else if (playerPlay === ROCK && computerPlay === SCISSORS) {
            return HUMAN_WINS;
        }
        else if (playerPlay === PAPER && computerPlay === PAPER) {
            return DRAW;
        }
        else if (playerPlay === PAPER && computerPlay === ROCK) {
            return HUMAN_WINS;
        }
        else if (playerPlay === PAPER && computerPlay === SCISSORS) {
            return COMPUTER_WINS;
        }
        else if (playerPlay === SCISSORS && computerPlay === SCISSORS) {
            return DRAW;
        }
        else if (playerPlay === SCISSORS && computerPlay === ROCK) {
            return COMPUTER_WINS;
        }
        else if (playerPlay === SCISSORS && computerPlay === PAPER) {
            return HUMAN_WINS;
        }
    }
}

let calcScore = function (results) {
    if (results === COMPUTER_WINS) {
        computerScore++;
    } else if (results === HUMAN_WINS) {
        humanScore++;
    }
    else{
        humanScore++;
        computerScore++;
    }
};

let game = function (getResults, calcScore) {
    let result = compareResults(playerPlay, computerPlay);
    calcScore(result);
    console.log(`Player's score is ${humanScore} and ${computerScore} for computer.`);
    console.log(`--------------------- END ---------------------`);
};

let getWinner = function (humanScore, computerScore) {
    if (humanScore < computerScore) {
        console.log(COMPUTER_WINS);
    }
    else if (humanScore > computerScore) {
        console.log(HUMAN_WINS);
    }
    else console.log(`Human and computer ${DRAW}`);
}

let playGame = function () {
    game(compareResults, calcScore);
    game(compareResults, calcScore);
    game(compareResults, calcScore);
    game(compareResults, calcScore);
    game(compareResults, calcScore);

    getWinner(humanScore, computerScore);
}


// PLAY THE GAME
playGame();




