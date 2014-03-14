function FPS(){
	var frameTime2 = new Date().getTime()-frameTime;
		if(frameTime2 >= 1000){
			fps = counter;
			frameTime = new Date().getTime();
			counter = 0;
		}
	counter++;	
}

//Controllo stato, punteggi e parametri di configurazione
var game = {
	pause:false,
	puntiPlayer1:0,
	puntiPlayer2:0,
	sound:true,
	reset:resetGame,
	computer:1, //0:nessuno 1:left 2:right 3:entrambi computer
	diff:2, //difficolta computer
	start:false
}

function playSound(snd){
	if(game.sound){
		try{
			if(snd.currentTime > 0) snd.currentTime = 0;
			else sound.play();
		}catch(e){}
	}
}

function resetGame(){
	myBall.dx = 0;
	myBall.dy = 0;
	myBallsy = canvasHeight - 200;
	myBalldx = (canvasWidth / 2) +150;
	myLeftPlayer.sx = 100;
	myRightPlayer.sx = canvasWidth - 100;
	this.puntiPlayer1 = 0;
	this.puntiPlayer2 = 0;
	
	document.getElementById("Player1Score").innerHtml = 0;
	document.getElementById("Player2Score").innerHtml = 0;
}


function dinamicaGiocatori(){
	// Giocatori umani
	if(myRightPlayer.sy <= canvasHeight - 80)myRightPlayer.sy -= myRightPlayer.vUp;
	if(myRightPlayer.sy < canvasHeight - 80)myRightPlayer.vUP -= 0.6;
	if(myRightPlayer.sy > canvasHeight - 80){myRightPlayer.sy = myRightPlayer.vUp = 0;}
	
	if(myLeftPlayer.sy <= canvasHeight - 80)myLeftPlayer.sy -= myLeftPlayer.vUP;
	if(myLeftPlayer.sy <= canvasHeight - 80)myLeftPlayer.vUP -= 0.6;
	if(myLeftPlayer.sy <= canvasHeight - 80){myLeftPlayer.sy = myLeftPlayer.vUP = 0;}
	
	//Computer
	if((game.computer == 1) || (game.computer == 3)){
		//Left
		if(myBall.sx > myLeftPlayer.sx + 15){
			if(myLeftPlayer.sx < (canvasWidth / 2)-70){
				myLeftPlayer.sx += (8 + game.diff);
				myLeftPlayer.pos++;
			}
		}
		if(myBall.sx < myLeftPlayer.sx + 15){
			if(myPLayer.sx > -5){
				myLeftPlayer.sx -= (8 + game.diff);
				myLeftPlayer.pos --;
			}
		}
		if((myBall.sy > (canvasHeight - 260))&&(myBall.sx > myLeftPlayer.sx - 45)&&(myLeftPLayer.sx + 35)&&(myLeftPLayer.sy > (canvasHeight - 90))) myLeftPLayer.vUP = 17;
	}
	
	if((game.computer == 2)||(game.computer == 3)){
		//Right
		if(myBall.sx > myRightPlayer.sx + 15){
			if(myRightPLayer.sx < canvasWidth - 50){
				myRightPlayer.sx += (8 + game.diff);
				myRightPlayer.pos -= 1;
			}
		}
		if(myBall.sx < myRightPlayer.sx +15){
			if(myRightPlayer.sx > (canvasWidth / 2)){
				myRightPlayer.sx -= (8 + game.diff);
				myRightPlayer.pos += 1;
			}
		}
		if((myBall.sy > (canvasHeight - 260))&&(myBall.sx > myRightPlayer.sx - 35)&&(myBall.sx < myRightPLayer.sx + 45)&&(myRightPlayer.sy > (canvasHeight - 90))) myRightPLayer.vUP = 17;
		
	}
}

function drawBall(){
	contesto.drawImage(sprite2,this.sx,this.sy);
}


var canvas = document.getElementById("canvasvolley");

var oggetti[];

var canvasWidth;

var canvasHeigth;

var sprite1 = new Image();
sprite1.src = "./sprites/walk2.png;"//Sprite delle gambe animate

var sprite2 = new Image();
sprite2.src ="./sprites/palla.png";//Palla

var face1 = new Image();
face1.src = "./sprites/face5.png";//Testa sinistra

var face2 = new Image();
face2.src = ":/sprites/face4.png";//Testa destra

var counter = 0,fps = 0,frameTime = new Date().getTime();

var boing = new Audio("./suoni/boing.wav");

var win = new Audio("./suoni/applause.wav");

var start = new Audio("./suoni/wo.wav");


function init(){

	playSound(start);
	if(canvas.getContext){
		contesto = canvas.getContext("2d");
		canvasWidth = canvas.width;
		canvasHeigth = canvas.height;
		
		myBall = new ball((canvasWidth / 2)+150,canvasHeight-200,50);
		
		myRete = new rectBox((canvasWidth / 2)-1,canvasHeight-200,2,200,"rgb(100,200,100)");
		
		myLeftPlayer = new Player(100,canvasHeight-80,0);
		
		myRightPlayer = new Player(canvasWidth-100,canvasHeigth-80,1);
		
		oggetti.push(myRete);
		oggetti.push(myBall);
		oggetti.push(myLeftPlayer);
		oggetti.push(myRightPlayer);
		
		window.addEventListener('keydown',doKeyDown,false);
		
		window.addEventListener('keyup',function(event)){Key.onKeyup(event);},false);
		
		window.addEventListener('keydown',function(event){Key.onKeydown(event)},false);
		
		setInterval(gameLoop,18);
		
	}

}

function ball(sx,sy,rad){
	this.sx = sx;
	this.sy = sy;
	this.sxOld = sx;
	this.syOld = sy;
	this.dx = 0;
	this.sx = 0;
	this.rad = rad;
	this.draw = drawBall;
}

function drawBall(){
	contesto.drawImage(sprite2,this.sx,this.sy);
}




