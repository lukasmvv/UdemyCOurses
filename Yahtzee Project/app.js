console.log('Hello yahtzee!');

function testF(event) {
	console.log(event.target.textContent);
}


var s = document.querySelector('.player_button').addEventListener('click', testF);

