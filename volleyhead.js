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
