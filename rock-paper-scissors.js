let scoreBoard = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

updateScore();

let isAutoPlaying = false;
let intervalId;

function autoPlay () {
if(!isAutoPlaying) {
intervalId = setInterval(function () {
  const playerMove = pickComputerMove();
  playGame(playerMove);
},1000);
document.querySelector('.js-auto-play').innerHTML = 'Stop Play';
isAutoPlaying = true;
}
else {
  clearInterval(intervalId);
  isAutoPlaying = false;
  document.querySelector('.js-auto-play').innerHTML = 'Auto Play';
}
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-reset-score-button')
.addEventListener('click', () => {
  scoreBoard = {
    win: 0,
    lose: 0,
    tie: 0
}
localStorage.removeItem('score');
updateScore();
document.querySelector('.js-result').innerHTML = '';
document.querySelector('.js-moves').innerHTML = '';
});

document.querySelector('.js-auto-play')
.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  }
  else if(event.key === 'p') {
    playGame('paper');
  }
  else if(event.key === 's') {
    playGame('scissors');
  }
});

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