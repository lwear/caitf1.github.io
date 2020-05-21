//global variables 
var score1 = 0;
var score2 = 0;
document.getElementById("score1").innerHTML = score1;
document.getElementById("score2").innerHTML = score2;

var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var buzzer = new sound("buzzer.mp3");
var bounce = new sound("bounce.wav");


//start ball motion
window.addEventListener('load', function(){
	startBall();
});

//move paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87){ //W
		speedOfPaddle1 = -10;
	}
	if (e.keyCode == 83 || e.which == 83){ //S
		speedOfPaddle1 = 10;
	}
	
	if (e.keyCode == 38 || e.which == 38){ //UP ARROW
		speedOfPaddle2 = -10;
	}
	if (e.keyCode == 40 || e.which == 40){ //DOWN ARROW
		speedOfPaddle2 = 10;
	}
	
});

//stop paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87){ //W
		speedOfPaddle1 = 0;
	}
	
	if (e.keyCode == 87 || e.which == 87){ //S
		speedOfPaddle1 = 0;
	}
	
	if (e.keyCode == 38 || e.which == 38){ //UP ARROW
		speedOfPaddle2 = 0;
	}
	
	if (e.keyCode == 40 || e.which == 40){ //DOWN ARROW
		speedOfPaddle2 = 0;
	}

});


// object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} 


//start the ball movement
function startBall() {
	let direction = 1;
	var topPositionOfBall = startTopPositionOfBall;
	var leftPositionOfBall = startLeftPositionOfBall;
	
	//50% change of starting in either direction (right or left)
	if(Math.random()<0.5){
		direction: 1;
	} else {
		direction = -1;
	}
	topSpeedOfBall = Math.random() * 2 + 3; //3-4.9999
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);
	
} // startBall


//update locations of paddles and ball
window.setInterval(function show(){
	
	//update positions of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stop paddles from leaving top of gameboard
	if(positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}
	if(positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}
	
	// stop paddles from leaving bottom of gameboard
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}
	if(positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}
	
	// if ball hits top or bottom of gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
		topSpeedOfBall *= -1;  // equivalent to topSpeedOfBall = -topSpeedOfBall;
	}
	
	// ball on left edge of gameboard
	if(leftPositionOfBall <= paddleWidth) {
		
		// if ball hits left paddle, change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1;
		}else {
			buzzer.play();
			score2++;
			document.getElementById("score2").innerHTML = score2;
			startBall();
		}//else
	}//if

	// ball on right edge of gameboard
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
		// if ball hits right paddle, change direction
		if (topPositionOfBall > positionOfPaddle2 && 
		    topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			bounce.play();
			leftSpeedOfBall *= -1;
		}else {
			buzzer.play();
			score1++;
			document.getElementById("score1").innerHTML = score1;
			startBall();
		}//else
	}//if
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

}, 1000/60); //show