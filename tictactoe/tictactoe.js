let currentPlayer = "X";
let cb = []; // current board
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;

let idNames = ["one", "two", "three", "four", "five", 
				"six", "seven", "eight", "nine"];

const winningCombos = [
["one", "two", "three"],
["four", "five", "six"],
["seven", "eight", "nine"],
["one", "four", "seven"],
["two", "five", "eight"],
["three", "six", "nine"],
["one", "five", "nine"],
["three", "five", "seven"]
];

//reset board and all variables
function newGame() {
	
	//reset board
	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
	}//for
	
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls");
	
} // newGame

//randomly chooses a free box for computer
function computerTakeTurn() {
	let idName = "";
	
	// choose random boxes until an empty box is found
	do {
		
		if((document.getElementById(("one"&&"two")||("two"&&"three")||("one"&"three")).innerHTML = "X")||(document.getElementById(("one"&&"two")||("two"&&"three")||("one"&"three")).innerHTML = "O")){
		let rand = parseInt(Math.random()*3) + 1; //1-3
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("four"&&"five")||("four"&&"six")||("five"&"six")).innerHTML = "X")||(document.getElementById(("four"&&"five")||("four"&&"six")||("five"&"six")).innerHTML = "O")){
		let rand = parseInt(Math.random()*6) + 4; //3-6
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("seven"&&"eight")||("eight"&&"nine")||("seven"&"nine")).innerHTML = "X")||(document.getElementById(("seven"&&"eight")||("eight"&&"nine")||("seven"&"nine")){
		let rand = parseInt(Math.random()*9) + 7; //6-9
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("one"&&"four")||("four"&&"seven")||("one"&"seven")).innerHTML = "X")||(document.getElementById(("one"&&"four")||("four"&&"seven")||("one"&"seven")).innerHTML = "X")).innerHTML = "O")){
		let rand = parseInt(Math.random()*(1||4||7)); //1,4,7
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("five"&&"two")||("two"&&"eight")||("five"&"eight")).innerHTML = "X")||(document.getElementById(("five"&&"two")||("two"&&"eight")||("five"&"eight")).innerHTML = "O")){
		let rand = parseInt(Math.random()*(2||5||8); //2,5,8
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("three"&&"six")||("six"&&"nine")||("nine"&"three")).innerHTML = "X")||(document.getElementById(("three"&&"six")||("six"&&"nine")||("nine"&"three")).innerHTML = "O")){
		let rand = parseInt(Math.random()*(3||6||9)); //3,6,9
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("one"&&"five")||("five"&&"nine")||("one"&"nine")).innerHTML = "X")||(document.getElementById(("one"&&"five")||("five"&&"nine")||("one"&"nine")).innerHTML = "O")){
		let rand = parseInt(Math.random()*(1||5||9)); //1,5,9
		idName = idNames[rand-1];
		}
		
		if((document.getElementById(("three"&&"five")||("seven"&&"three")||("five"&"seven")).innerHTML = "X")||(document.getElementById(("three"&&"five")||("seven"&&"three")||("five"&"seven")).innerHTML = "O")){
		let rand = parseInt(Math.random()*(3||5||7); //3,5,7
		idName = idNames[rand-1];
		}
		
		//check if chosen box is empty
		if(document.getElementById(idName).innerHTML = "") {
		document.getElementById(idName).innerHTML = currentPlayer;
		break;
		}
		
	} while(true);
	

} //computerTakeTurn

// take player turn 
function playerTakeTurn(e) {
	
	if(e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		checkGameStatus();	
		
		// if game not over, computer goes
		if (gameStatus == "") {
			setTimeout(function() {
			computerTakeTurn();
			checkGameStatus();
			}, 500
		    );
		}//if
		
	} else {
		showLightBox("This box is already selected.", "Please try another.");
		return;
	}//else
		 
}//playerTakeTurn

//after each turn, check for a winner, a tie, or continue playing
function checkGameStatus() {
	numTurns++; //count turns
	
	// check for a win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
		return;
	}
	
	//check for tie
	if (numTurns ==9){
		gameStatus = "Tie Game!";
	}
	
	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
	
	// game is over
	if(gameStatus != ""){
		setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
	}
	
}//checkGameStatus

//check for a Win, there are 8 win paths
function checkWin() {
	cb[0] = ""; // not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	// first row
	if (cb[1] !="" && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}
	
	// second row
	if (cb[4] !="" && cb[4] == cb[5] && cb[5] == cb[6]){
		return true;
	}
	
	// third row
	if (cb[7] !="" && cb[7] == cb[8] && cb[8] == cb[9]){
		return true;
	}
	
	//first column
	if (cb[1] !="" && cb[1] == cb[4] && cb[4] == cb[7]){
		return true;
	}
	
	//second column
	if (cb[2] !="" && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}
	
	//third column
	if (cb[3] !="" && cb[3] == cb[6] && cb[6] == cb[9]){
		return true;
	}
	
	//left to right diagonal
	if (cb[1] !="" && cb[1] == cb[5] && cb[5] == cb[9]){
		return true;
	}
	
	//right to left diagonal
	if (cb[3] !="" && cb[3] == cb[5] && cb[5] == cb[7]){
		return true;
	}
	
}//checkWin

function changeVisibility(divID){
	
	var element = document.getElementById(divID);
	
	//if element exists, toggle its class between hidden and unhidden
	
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
	
} //changeVisibility

//display message in lightbox
function showLightBox(message, message2){
	
	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}//showLightBox

//close light box
function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
	//if the game is over, show controls
	if (gameStatus != "") {
		changeVisibility("controls");
	} // newGame
	
}//continueGame