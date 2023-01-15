const gameWindowElement = document.getElementById('game-container');
const resultWindowElement = document.getElementById('result-window');

const paperElement = document.getElementById('paper');
const scissorsElement = document.getElementById('scissors');
const rockElement = document.getElementById('rock');
const lizardElement = document.getElementById('lizard')
const spockElement = document.getElementById('spock')

const userPoints = document.getElementById('user-points');
const pcPoints = document.getElementById('pc-points');

const buttonPlayAgainElement = document.getElementById('play-again');
const resetElement = document.getElementById('reset');

const userImgElement = document.getElementById('userimg');
const pcImgElement = document.getElementById('pcimg');

const resultTextElement = document.getElementById('result-text');
const userPlayTextElement = document.getElementById('user-play-text');
const pcPlayTextElement = document.getElementById('pc-play-text');

const advancedMode = document.body.dataset.advanced;

const playsOptions = ['paper', 'scissors', 'rock'];

const playsResultsObj = {
  rock: {
    paper: false,
    scissors: true,
    lizard: true,
    spock: false
  },
  paper: {
    rock: true,
    scissors: false,
    lizard: false,
    spock: true
  },
  scissors: {
    rock: false,
    paper: true,
    lizard: true,
    spock: false
  },
  lizard: {
    rock: false,
    paper: true,
    scissors: false,
    spock: true
  },
  spock: {
    rock: true,
    paper: false,
    scissors: true,
    lizard: false
  }
};

let userCounter = 0;
let pcCounter = 0;
let userPlay;
let pcPlay;

/* FUNCIONES */
if(advancedMode === 'advanced-mode'){
  playsOptions.push('lizard', 'spock')
}

const randomPlay = () => {
  pcPlay = playsOptions[Math.floor(Math.random() * playsOptions.length)];
};

const updateScore = () => {
  userPoints.textContent = userCounter;
  pcPoints.textContent = pcCounter;
};

const showWindows = () => {
  resultWindowElement.classList.add('result-window--show');
  gameWindowElement.classList.add('game-container-unshow');
};

const finalResult = (a, b) => {
  console.log(a, b);
  if (a === b) {
    resultTextElement.textContent = 'DRAW';
    return;
  }
  if (playsResultsObj[a][b]) {
    resultTextElement.textContent = 'YOU WIN';
    userCounter++;
  } else {
    resultTextElement.textContent = 'YOU LOOSE';
    pcCounter++;
  }
  updateScore();
};

const reset = () => {
  userCounter = 0;
  pcCounter = 0;
  updateScore();
};

const finalResultSRC = () => {
  userImgElement.src = `assets/images/icon-${userPlay}.svg`;
  pcImgElement.src = `assets/images/icon-${pcPlay}.svg`;
  userImgElement.parentElement.classList.add(`button--${userPlay}-result`);
  pcImgElement.parentElement.classList.add(`button--${pcPlay}-result`);
  userPlayTextElement.textContent = `YOU PICKED ${userPlay.toUpperCase()}`;
  pcPlayTextElement.textContent = `PC PICKED ${pcPlay.toUpperCase()}`;

const timeoutId = setTimeout(() => {
  userImgElement.parentElement.classList.add(`button--${userPlay}-result-show`);
  pcImgElement.parentElement.classList.add(`button--${pcPlay}-result-show`);
  clearTimeout(timeoutId);
}, 100);
};

/* EVENTOS */

gameWindowElement.addEventListener('click', ev => {
  if (ev.target.tagName !== 'IMG') return;
  userPlay = ev.target.id;
  randomPlay();
  finalResult(userPlay, pcPlay);
  showWindows();
  finalResultSRC();
});

buttonPlayAgainElement.addEventListener('click', () => {
  gameWindowElement.classList.remove('game-container-unshow');
  resultWindowElement.classList.remove('result-window--show');
  userImgElement.parentElement.classList.remove(`button--${userPlay}-result`);
  pcImgElement.parentElement.classList.remove(`button--${pcPlay}-result`);
  userImgElement.parentElement.classList.remove(`button--${userPlay}-result-show`);
  pcImgElement.parentElement.classList.remove(`button--${pcPlay}-result-show`);
});

resetElement.addEventListener('click', reset);
