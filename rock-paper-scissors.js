let scoreBoard = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    tie: 0
};

updateScore();

function playGame(playerMove) {
computerMove = pickComputerMove();

if (playerMove === "scissors") {
  if (computerMove === "rock") {
    result = "You Lose !";
  } else if (computerMove === "paper") {
    result = "You Win !";
  } else if (computerMove === "scissors") {
    result = "Tie.";
  }
} else if (playerMove === "rock") {
  if (computerMove === "rock") {
    result = "Tie.";
  } else if (computerMove === "paper") {
    result = "You Lose !";
  } else if (computerMove === "scissors") {
    result = "You Win !";
  }
} else if (playerMove === "paper") {
  if (computerMove === "rock") {
    result = "You Win !";
  } else if (computerMove === "paper") {
    result = "Tie.";
  } else if (computerMove === "scissors") {
    result = "You Lose !";
  }
}

if(result === "You Win !"){
    scoreBoard.win += 1;
}
else if(result === "You Lose !"){
    scoreBoard.lose += 1;
}
else if(result === "Tie."){
    scoreBoard.tie += 1
}

localStorage.setItem('score', JSON.stringify(scoreBoard));
updateScore();
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon" />
<img src="images/${computerMove}-emoji.png" class="move-icon" /> Computer`;
}

function updateScore () {
document.querySelector('.js-score').innerHTML = `Wins: ${scoreBoard.win}, Loses: ${scoreBoard.lose}, Tie: ${scoreBoard.tie}`;
}

function pickComputerMove() {
let computerMove = "";
let randomNumber = Math.random();
let result = "";

if (randomNumber < 1 / 3) {
  computerMove = "rock";
} else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
  computerMove = "paper";
} else {
  computerMove = "scissors";
}

return computerMove;
}