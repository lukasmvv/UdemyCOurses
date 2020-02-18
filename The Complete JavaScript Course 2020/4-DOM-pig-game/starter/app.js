/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function rollDice() {
	var ret = Math.floor(Math.random()*6) + 1;
	return ret
}

function changePlayer() {

	// Setting active player CSS style by toggle
	for (var i=0;i<players.length;i++) {
		var activePlayerDOM = document.querySelector('.player-'+i+'-panel');
		activePlayerDOM.classList.toggle('active');
	}

	// Removing dice when changing player 
	diceDOM.style.display = 'none';

	// Setting active player
	activePlayer === 0 ? activePlayer=1 : activePlayer=0;  // in-line if
}

function updateScores() {
	// Looping through players and updating HTML scores
	for (var i=0;i<players.length;i++){

		// Set html content
		document.getElementById('score-'+i).textContent = players[i].globalScore;
		document.getElementById('current-'+i).textContent = players[i].roundScore;
	}
}

function removeActivesAndWinning() {
	// Looping through players and removing active and winning classes
	for (var i=0;i<players.length;i++){

		// Set html content
		document.querySelector('.player-'+i+'-panel').classList.remove('active');
		document.querySelector('.player-'+i+'-panel').classList.remove('winner');
	}
}

function init() {

	var player0 = {
	name: 'Player 1',
	roundScore: 0,
	globalScore: 0,
	turn: false
	}

	var player1 = {
		name: 'Player 2',
		roundScore: 0,
		globalScore: 0,
		turn: false
	}

	// Players array
	players = [player0, player1];

	// Starting settings
	activePlayer = 0;
	winningScore = 20;

	// Dice DOM Object
	diceDOM = document.querySelector('.dice');  // make the selection once and then use the stored selection
	diceDOM.style.display = 'none'; // this will make the dice disapear

	// Setting initial scores
	for (var i=0;i<players.length;i++){
		// Set scores to 0
		players[i].roundScore = 0;
		players[i].globalScore = 0;

		document.querySelector('#name-'+i).textContent = players[i].name;
	}

	// Enabling roll button
	document.querySelector('.btn-roll').disabled = false;
	document.querySelector('.btn-hold').disabled = false;

	// Updating scores
	updateScores();

	// Setting active player for new game
	activePlayer = 0;
	removeActivesAndWinning();
	document.querySelector('.player-0-panel').classList.add('active');
}

var activePlayer, players, winningScore, diceDOM;

init();



// changing text
//document.querySelector('#score-'+activePlayer).textContent = rollDice();

// inserting html code
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + rollDice() + '</em>'; // em is to emphasie text

// getting content from page
//var x = document.querySelector('#current-'+activePlayer).textContent;

// changing CSS
// var diceDOM = document.querySelector('.dice');  // make the selection once and then use the stored selection
// diceDOM.style.display = 'none'; // this will make the dice disapear
//document.querySelector('.dice').style.display = 'block'; // this will make the dice reappear


// we can also use another method to get elements - this method is a bit faster
// document.getElementById('score-0').textContent = 0;  // no css style, just put id
// document.getElementById('score-1').textContent = 0;  // no css style, just put id
// document.getElementById('current-0').textContent = 0;  // no css style, just put id
// document.getElementById('current-1').textContent = 0;  // no css style, just put id

// function button() {

// }

// setting up button roll event listener
//document.querySelector('.btn-roll').addEventListener('click', btn); // note no brackets for btn function, since the listener must call the function. it is called the callback function

// we can also write it as an anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
	
	// Get random number
	var diceRoll = rollDice();

	// Display result
	//var diceDOM = document.querySelector('.dice');  // make the selection once and then use the stored selection
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-'+diceRoll+'.png';

	// Update round score if number not 1
	var roundScore = parseInt(players[activePlayer].roundScore);
	if (diceRoll>1){
		roundScore += diceRoll;
	} else {
		roundScore = 0;
	}
	players[activePlayer].roundScore = roundScore;
	updateScores();

	// Changing player
	if (roundScore === 0) {
		 changePlayer();
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	// Save round score and add to global score
	players[activePlayer].globalScore += players[activePlayer].roundScore;
	players[activePlayer].roundScore = 0;

	// Updating scores
	updateScores();

	// Checking for a winner
	if (players[activePlayer].globalScore >= winningScore){
		removeActivesAndWinning();
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
		document.querySelector('.btn-roll').disabled = true;
		document.querySelector('.btn-hold').disabled = true;
		document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
	} else {
		// Change player
		changePlayer();
	}
	
});

document.querySelector('.btn-new').addEventListener('click', init);


