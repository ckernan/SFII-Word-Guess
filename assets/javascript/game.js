let game = {
	names: [['Chun Li', 'assets/images/ChunLi.png'], ['E Honda', 'assets/images/E.Honda.png'], ['M Bison', 'assets/images/M.Bison.png'], ['Blanka', 'assets/images/Blanka.png'], ['Ryu', 'assets/images/Ryu.png'], ['Vega', 'assets/images/Vega.png'], ['Zangief', 'assets/images/Zangief.png'], ['Dhalsim', 'assets/images/Dhalsim.png'], ['Sagat', 'assets/images/Sagat.png'], ['Guile', 'assets/images/Guile.png'], ['Balrog', 'assets/images/Balrog.png'], ['Ken', 'assets/images/Ken.png']],
	guesses: 10,
	wins: 0,
	losses: 0,
	correct: [],
	attempts: [],
    gameOver: false,
    
    pickName: function() {
		return [Math.floor(Math.random()*this.names.length)];
	},


}



var fighter = game.pickName();//pick an index from fighter.length
var gameName = game.names[fighter][0];//pick fighter name given index
var picture = game.names[fighter][1];//pick fighter picture given index
var arrGameName = gameName.split("");//split fighter name into array
var lowGameName = gameName.toLowerCase();//make all letters in fighter name lowercase

function findSpaces(arrName) {//find number of spaces in arrGameName
	var spaces = 0;
	for(i=0; i<arrName.length; i++) {
		if(arrName[i] === " ") {//check if there is a space, if so add 1 to spaces variable
			spaces++ 
		}
	} 
	return spaces
}

function createBoard() {//create game board function, based on name chosen
	for(i=0; i<arrGameName.length; i++) {
		if(arrGameName[i] === " ") {//check if there is a blank space in array, if so run statement
			letterList = "<li style='border-bottom:none;margin:0 15px 0 15px' id='" + i + "'>" + arrGameName[i] + "</li>";//add <li> and class for blank space with id=i
			document.getElementById('game').innerHTML += letterList; 
		} else {//if not blank space add <li> with id=i
			letterList = "<li id='" + i + "'></li>";
			document.getElementById('game').innerHTML += letterList;
		}
	}
}

createBoard();//create game board

document.onkeyup = function(event) {//on keyup function
	var key = String.fromCharCode(event.keyCode).toLowerCase();//turn event of key into lowercase

	if(event.keyCode > 64 && event.keyCode < 91) {//check for only letter keys
		
		if(game.attempts.indexOf(key) === -1) {//if attempts array does not contain letter chosen then continue
			if(lowGameName.indexOf(key) > -1) {//if letter chosen is part of fighter name continue
				
				game.attempts.push(key);//push letter into attempts array
				game.correct.push(key);//push letter into correct letters array
				var index = lowGameName.indexOf(key);//check for double letters by setting index equal to place where first letter appeared
				document.getElementById(index).innerHTML = key;//add letter in html using id
				if(lowGameName.indexOf(key, index + 1) > -1) {//check for same letter in fighter name. Since all fighter names only have 2 max of same letter just do once.
					var otherIndex = lowGameName.indexOf(key, index + 1);//find other index of same letter
					game.correct.push(key);//also add same letter to correct since I'm using .length to check for a win
					document.getElementById(otherIndex).innerHTML = key;//add same letter in html using id
				}
				if(lowGameName.length - findSpaces(arrGameName) === game.correct.length) {//check for win. fighter name - spaces against correct letter array
					document.getElementById('you').innerHTML = "YOU";
					document.getElementById('win-lose').innerHTML = "WIN!!";//tell user they won html
					document.getElementById('win-img').src = picture;//change picture to fighter
					game.wins++;//increment wins by 1
					game.guesses = 10;//reset guesses
					game.attempts = [];//reset attempts array
					game.correct = [];//reset correct array
					setTimeout(function(){document.getElementById('game').innerHTML = "";}, 1000);//wait 1s (1000milliseconds) and clear board html
					fighter = game.pickName();//pick new random fighter
					gameName = game.names[fighter][0];
					picture = game.names[fighter][1];
					arrGameName = gameName.split("");
					lowGameName = gameName.toLowerCase();
					setTimeout(function(){createBoard();}, 2000);//recreate board after 2s
					

				}
			} else {                           //if user picks wrong letter, run this
				
				game.attempts.push(key);       //add missed letter to attempts array
				game.guesses--;                //increment guesses down 1
			}
		}
	}
	if(game.guesses === 0) {//if user runs out of guesses, loses
		
		document.getElementById('you').innerHTML = "YOU";//display they lose
		document.getElementById('win-lose').innerHTML = "LOSE";
		game.losses++;//increment losses up 1
		game.guesses = 10;//reset guesses
		game.attempts = [];//reset attempt array
		game.correct = [];//reset correct array
		document.getElementById('game').innerHTML = "";//clear html of #game
		fighter = game.pickName();//choose fighter index
		gameName = game.names[fighter][0];//name of fighter
		picture = game.names[fighter][1];//pic of fighter
		arrGameName = gameName.split("");//make array
		lowGameName = gameName.toLowerCase();//lowercase the array
		setTimeout(function(){createBoard();}, 2000);//make board after 2s
	}
	var html = '<p>Turns Left: ' + game.guesses + '</p>' +       //html to display once user clicks and updates with clicks
	'<p>Guessed Letters: ' + game.attempts.join(',') + '</p>' + 
	'<p>Wins: ' + game.wins + '</p>' + 
	'<p>Losses: ' + game.losses + '</p>';

	document.querySelector('#stats').innerHTML = html;
}
