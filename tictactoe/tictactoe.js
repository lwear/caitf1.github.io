let currentPlayer = "X";
let cb = [];
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;

let idNames = ["one", "two", "three", "four", "five", 
				"six", "seven", "eight", "nine"];

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
	
	// choose random boxes until an empty box is found
		
	//check first row
	if ( cb[1] == cb[2] && cb[3] == "") {
	   idName = idNames[2];  
	}else if (cb[1] == cb[3] && cb[2] == ""){
	   idName = idNames[1];  
	} else if  (cb[2] == cb[3] && cb[1] == "") {
	  idName = idNames[0];
	} else {
	   do {
		  idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
		
	
	//check second row
	if ( cb[4] == cb[5] && cb[6] == "") {
	   idName = idNames[5];  
	}else if (cb[4] == cb[6] && cb[5] == ""){
	   idName = idNames[4];  
	} else if  (cb[5] == cb[6] && cb[14] == "") {
	  idName = idNames[3];
	} else {
	   do {
		  idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
		
	
	//check third row
	if ( cb[7] == cb[8] && cb[9] == "") {
	   idName = idNames[8];  
	}else if (cb[7] == cb[9] && cb[8] == ""){
	   idName = idNames[7];  
	} else if  (cb[8] == cb[9] && cb[7] == "") {
	  idName = idNames[6];
	} else {
	   do {
		  idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
		
	//check first column
	if ( cb[1] == cb[4] && cb[7] == "") {
	   idName = idNames[6];  
	}else if (cb[1] == cb[7] && cb[4] == ""){
	   idName = idNames[3];  
	} else if  (cb[4] == cb[7] && cb[1] == "") {
	  idName = idNames[0];
	} else {
	   do {
		  idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
		
	//check second column
	if ( cb[2] == cb[5] && cb[8] == "") {
	   idName = idNames[7];  
	}else if (cb[2] == cb[8] && cb[5] == ""){
	   idName = idNames[4];  
	} else if  (cb[5] == cb[8] && cb[2] == "") {
	  idName = idNames[1];
	} else {
	   do {
		  idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
		
	//check third column
	if ( cb[3] == cb[6] && cb[9] == "") {
	   idName = idNames[8];  
	}else if (cb[3] == cb[9] && cb[6] == ""){
	   idName = idNames[5];  
	} else if  (cb[6] == cb[9] && cb[3] == "") {
	  idName = idNames[2];
	} else {
	   do {
		   idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
		
	//check L-R diagonal
	if ( cb[1] == cb[5] && cb[9] == "") {
	   idName = idNames[8];  
	}else if (cb[1] == cb[9] && cb[5] == ""){
	   idName = idNames[4];  
	} else if  (cb[5] == cb[9] && cb[1] == "") {
	  idName = idNames[0];
	} else {
	   do {
		  idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else

	//check R-L diagonal
	if ( cb[3] == cb[5] && cb[7] == "") {
	   idName = idNames[6];  
	}else if (cb[7] == cb[3] && cb[5] == ""){
	   idName = idNames[4];  
	} else if  (cb[5] == cb[7] && cb[3] == "") {
	  idName = idNames[2];
	} else {
	   do {
		   idName = idNames[parseInt(Math.random()*9)];
		  if(document.getElementById(idName).innerHTML == "") {  
				break;
		  }
		}while(true);
	} // else
	
	document.getElementById(idName).innerHTML = currentPlayer;
		
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
	}//check for tie
	
	else if (numTurns ==9){
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