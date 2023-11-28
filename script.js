'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1')
const totalScore0 = document.querySelector('#score--0');
const currentScore0 = document.querySelector('#current--0');
const totalScore1 = document.querySelector('#score--1');
const currentScore1 = document.querySelector('#current--1');
const dicePic = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
let roll;
let currentPlayer = 0;
let counter = 0
let totalPlayer0 = 0;
let totalPlayer1 = 0;

const playerScores = [currentScore0, currentScore1];
const player = [player0, player1];

const playerSwitch = () => {
    counter = 0;
        playerScores[currentPlayer].textContent = counter;
        player[currentPlayer].classList.remove('player--active')
        currentPlayer = 1 - currentPlayer;
        player[currentPlayer].classList.toggle('player--active')
}


const rollDiceFunc = () => {
    

    roll = Math.trunc(Math.random() * 6) + 1;
    counter += roll; 

    dicePic.classList.remove('hidden');
    dicePic.src = `dice-${roll}.png`;

    

    if (roll == 1) {
        playerSwitch()
    } else {
        playerScores[currentPlayer].textContent = counter;
    }

}

const holdFunc = () => {
    if(currentPlayer == 0){
        totalPlayer0 += counter;
        totalScore0.textContent = totalPlayer0
        playerSwitch()
    } else {
        totalPlayer1 += counter;
        totalScore1.textContent = totalPlayer1
        playerSwitch()
    }
}



rollDiceBtn.addEventListener('click', rollDiceFunc)
holdBtn.addEventListener('click', holdFunc)