
function FPS()
{
	var frameTime2 = new Date().getTime() - frameTime;
	if (frameTime2 >= 1000) {
		// if (counter > fps) fps = counter;
		fps = counter;
		frameTime = new Date().getTime();
		counter = 0;
	}
	counter ++;
}
	
	var game={
			  pause : false,
			  puntiPlayer1 : 0,
			  puntiPlayer2 : 0,
			  sound : true,
			  reset : resetGame,
			  computer : 1, //  0: nessuno  1: left  2: right  3: entrambi computer
			  diff : 2, // difficoltà computer
			  start: false
	}
	
	
	function playSound(snd) {
		if (game.sound) {
			try {
				if  (snd.currentTime > 0)   snd.currentTime = 0;  else snd.play();
			}
			catch(e) {}
		}
	}
	
	function resetGame() {
	
				myBall.dx = 0;	
				myBall.dy = 0;	
				myBall.sy = canvasHeight - 200;
				myBall.sx = (canvasWidth / 2) + 150; 
				myLeftPlayer.sx = 100;
				myRightPlayer.sx = canvasWidth - 100;
			
			    this.puntiPlayer1 = 0;
				this.puntiPlayer2 = 0;
				document.getElementById("Player1Score").innerHTML = 0;
				document.getElementById("Player2Score").innerHTML = 0;
	}		 

	function dinamicaGiocatori() {
		
		// Giocatori umani
		
		if (myRightPlayer.sy <= canvasHeight - 80) myRightPlayer.sy -= myRightPlayer.vUP; 
		if (myRightPlayer.sy < canvasHeight - 80) myRightPlayer.vUP -= 0.6;
		if (myRightPlayer.sy > canvasHeight - 80) { myRightPlayer.sy = canvasHeight - 80; myRightPlayer.vUP = 0; }
		
		if (myLeftPlayer.sy <= canvasHeight - 80) myLeftPlayer.sy -= myLeftPlayer.vUP; 
		if (myLeftPlayer.sy < canvasHeight - 80) myLeftPlayer.vUP -= 0.6;
		if (myLeftPlayer.sy > canvasHeight - 80) {  myLeftPlayer.sy = canvasHeight - 80; myLeftPlayer.vUP = 0; }
	
		// Computer
		
		if ((game.computer == 1) || (game.computer == 3)) { // left
			
			if (myBall.sx > myLeftPlayer.sx + 15) { if (myLeftPlayer.sx < (canvasWidth / 2) - 70) { myLeftPlayer.sx += (8 + game.diff); myLeftPlayer.pos ++; } } 
		    if (myBall.sx < myLeftPlayer.sx + 15) { if (myLeftPlayer.sx > -5) { myLeftPlayer.sx -= (8 + game.diff);  myLeftPlayer.pos --; } }
		
			if ((myBall.sy > (canvasHeight - 260)) && (myBall.sx > myLeftPlayer.sx - 45) && (myBall.sx < myLeftPlayer.sx + 35) && (myLeftPlayer.sy > (canvasHeight - 90))) myLeftPlayer.vUP = 17;
		}
		
		if ((game.computer == 2) || (game.computer == 3)) { // right
			
			if (myBall.sx > myRightPlayer.sx + 15) { if (myRightPlayer.sx < canvasWidth - 50) { myRightPlayer.sx += (8 + game.diff); myRightPlayer.pos -=1; } } 
		    if (myBall.sx < myRightPlayer.sx + 15) { if (myRightPlayer.sx > (canvasWidth / 2)) { myRightPlayer.sx -= (8 + game.diff); myRightPlayer.pos +=1; }  }
		
			if ((myBall.sy > (canvasHeight - 260)) && (myBall.sx > myRightPlayer.sx - 35) && (myBall.sx < myRightPlayer.sx + 45) && (myRightPlayer.sy > (canvasHeight - 90))) myRightPlayer.vUP = 17;
		}
		
	}	
    
	
	function drawBall(){
	   //contesto.drawImage(sprite2,0,0,49,49,this.sx,this.sy,this.rad - 1,this.rad); 
	    contesto.drawImage(sprite2,this.sx,this.sy); 
	}
	
	function drawPlayer(){
	  
	  if (this.dir == 1) {
			if (this.pos > 9) this.pos = 0;
			if (this.pos < 0) this.pos = 9;
			startx = this.pos * 150;
		  	contesto.drawImage(sprite1,startx,180,150,170,this.sx,this.sy,60,80); 
			contesto.drawImage(face1,0,0,158,191,this.sx - 10,this.sy - 30,80,90);
	  }
	  else { 
	        if (this.pos > 9) this.pos = 0;
			if (this.pos < 0) this.pos = 9;
	  		startx = this.pos * 150;
	  		contesto.drawImage(sprite1,startx,0,150,170,this.sx,this.sy,60,80); 
			contesto.drawImage(face2,0,0,158,191,this.sx - 10,this.sy - 30,80,90);
	  }
	
	}
	
	function drawBox() {
	
	    contesto.fillstyle = this.fillstyle;
	    contesto.fillRect(this.sx,this.sy,this.swidth,this.sheight);
	}
	
	
	function dinamicaPalla() {
		
		// Movimento
		myBall.sy -= myBall.dy;
		myBall.sx += myBall.dx; 
		
		// urto il soffitto 
		//if ((myBall.dy > 0) && (myBall.sy < 0)) myBall.dy  = -myBall.dy; 
		
		// urto il pavimento
		if (myBall.sy >= canvasHeight - 50) { 
					
			game.start = false;
			myBall.dx = 0;
			myBall.dy = 0;
			myBall.sy = canvasHeight - 200; 
			
			if (myBall.sx < (canvasWidth / 2) - 20) { 
				game.puntiPlayer1 ++;
				myBall.sx = (canvasWidth / 2) + 150; 
			} else {
				game.puntiPlayer2 ++;
				myBall.sx = (canvasWidth / 2) - 150;
			}
			document.getElementById("Player1Score").innerHTML = game.puntiPlayer1;
			document.getElementById("Player2Score").innerHTML = game.puntiPlayer2;
			playSound(win);		
		}
			
	    // gravità
		if (game.start) myBall.dy -= 0.25; 
		
		// attrito laterale 
		if (myBall.dx > 0) myBall.dx -= 0.03; 
		if (myBall.dx < 0) myBall.dx += 0.03;
		
		// velocità massima
		var maxspeed = 15; 
		if (myBall.dx > maxspeed) myBall.dx = maxspeed;
		if (myBall.dx < -maxspeed) myBall.dx = -maxspeed;
		
		// urto la parete destra
		if (myBall.sx >= (canvasWidth - myBall.rad)) { myBall.dx = -1 * myBall.dx;  myBall.sx = canvasWidth - myBall.rad; }
		
		// urto la parete sinistra
		if (myBall.sx <= 0) { myBall.dx = -1 * myBall.dx;  myBall.sx = 0; }
		
		// urto il personaggio destro
		if ((myBall.sx > (myRightPlayer.sx - myBall.rad)) && (myBall.sx < (myRightPlayer.sx + myBall.rad)) && (myBall.sy > (myRightPlayer.sy - 20 - myBall.rad))) {
			   
			   playSound(boing);
			   
			   if (!game.start) game.start = true;
			   
			   if (myBall.sy < (myRightPlayer.sy + 35 - myBall.rad)) myBall.dy = 5 + (myRightPlayer.vUP / 2) + ((Math.random() * 3) -1.5);
			   // la palla va ->
			   if (myBall.dx > 0) {
				   if (myBall.sx <= myRightPlayer.sx) myBall.dx = -1 * myBall.dx;
			   }
			   // la palla va <-
			   if (myBall.dx < 0) {
				   if (myBall.sx > myRightPlayer.sx) myBall.dx = -1 * myBall.dx;
			   }
			   
			   myBall.dx -= ((myRightPlayer.sx - myBall.sx) / 10);
		}
		
		// urto il personaggio sinistro
		if ((myBall.sx > (myLeftPlayer.sx - myBall.rad)) && (myBall.sx < (myLeftPlayer.sx + myBall.rad)) && (myBall.sy > (myLeftPlayer.sy + -20 - myBall.rad))) {
			   
			   playSound(boing);
			   
			   if (!game.start) game.start = true;
			   
			   if (myBall.sy < (myLeftPlayer.sy + 35 - myBall.rad)) myBall.dy = 5 + (myLeftPlayer.vUP / 2) + ((Math.random() * 3) -1.5);
			   // la palla va ->
			   if (myBall.dx > 0) {
				   if (myBall.sx <= myLeftPlayer.sx) myBall.dx = -1 * myBall.dx;
			   }
			   // la palla va <-
			   if (myBall.dx < 0) {
				   if (myBall.sx > myLeftPlayer.sx) myBall.dx = -1 * myBall.dx;
			   }
			   
			   myBall.dx -= ((myLeftPlayer.sx - myBall.sx) / 10);
		}
		
		// urto la rete
		if (   (myBall.sx >= ((canvasWidth / 2) - myBall.rad)) && (myBall.sx <= (canvasWidth / 2)) && (myBall.sy > (canvasHeight - 240))) {
			   
			   if (myBall.sy < (canvasHeight - 180)) myBall.dy = -1 * myBall.dy;
			   
			   // la palla va ->
			   if (myBall.dx > 0) {
				   if (myBall.sx <= ((canvasWidth / 2) - (myBall.rad / 2))) myBall.dx = -1 * myBall.dx;
			   }
			   // la palla va <-
			   if (myBall.dx < 0) {
				   if (myBall.sx > ((canvasWidth / 2) - (myBall.rad / 2))) myBall.dx = -1 * myBall.dx;
			   }
		}

	}
	
	
	function acquisizioneInput() {
		if (Key.isDown(Key.LEFT1)) { if (myLeftPlayer.sx > -5) { myLeftPlayer.sx -=8;  myLeftPlayer.pos --; } } 
  		if (Key.isDown(Key.RIGHT1)) { if (myLeftPlayer.sx < (canvasWidth / 2) - 55) { myLeftPlayer.sx +=8; myLeftPlayer.pos ++; } }
  		if (Key.isDown(Key.LEFT)) { if (myRightPlayer.sx > (canvasWidth / 2)) { myRightPlayer.sx -=8;  myRightPlayer.pos ++; } } 
  		if (Key.isDown(Key.RIGHT)) { if (myRightPlayer.sx < canvasWidth - 50) { myRightPlayer.sx +=8; myRightPlayer.pos --; } }
	}
	

	function gameLoop() {
		
		if (!game.pause) {
		
			myLeftPlayer.sxOld = myLeftPlayer.sx;
			myLeftPlayer.syOld = myLeftPlayer.sy;
			myRightPlayer.sxOld = myRightPlayer.sx;
			myRightPlayer.syOld = myRightPlayer.sy;
			myBall.sxOld = myBall.sx;
			myBall.syOld = myBall.sy;
			
			acquisizioneInput(); 
			dinamicaGiocatori();
			dinamicaPalla();
			disegnaScena();
		}
	}
	
	function rectBox(sx,sy,swidth,sheight,stylestring)  {
	    this.sx=sx;
		this.sy=sy;
		this.swidth=swidth;
		this.sheight=sheight;
		this.fillstyle=stylestring;
		this.draw=drawBox;
	}
	
	function ball(sx,sy,rad) {
	    this.sx=sx;
		this.sy=sy;
		this.sxOld=sx;
		this.syOld=sy;
		this.dx=0;
	    this.dy=0;
		this.rad=rad;
		this.draw=drawBall;
	}
	
	function Player(sx,sy,dir){
	    this.sx=sx;
		this.sy=sy;
		this.sxOld=sx;
		this.syOld=sy;
		this.vUP = 0;
		this.draw = drawPlayer;
		this.dir = dir;
		this.pos = 0;
	}
	
	function disegnaScena() {
	   var i;
	   // contesto.clearRect(0,0,canvasWidth,canvasHeight); // Metodo lento
	
	   contesto.clearRect(myBall.sxOld - 1,myBall.syOld - 1,52,52);
	   contesto.clearRect(myLeftPlayer.sxOld - 10, myLeftPlayer.syOld - 30, 80,120);
	   contesto.clearRect(myRightPlayer.sxOld - 10, myRightPlayer.syOld - 30, 80,120);
	   contesto.clearRect(10, 15, 80,20);
	   
	   contesto.fillStyle="rgb(0,0,0)";
	   for (i=0;i<oggetti.length;i++){
	         oggetti[i].draw();
	   }
	   contesto.font = "10pt Arial";
	   contesto.fillText(' fps = '+fps, 10,30);
	   FPS();
    }
	
	var Key = {
	  
	  premuto: {},
	
	  LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, LEFT1: 65, RIGHT1: 68, UP1: 87, 
	  
	  isDown: function(keyCode) {
		return this.premuto[keyCode];
	  },
	  
	  onKeydown: function(event) {
		this.premuto[event.keyCode] = true;
	  },
	  
	  onKeyup: function(event) {
		delete this.premuto[event.keyCode];
	  }
	}
	
	//Key.isDown(Key.RIGHT)
	
	function doKeyDown(eve) 
	{        
		var key = eve.keyCode;
		if ((key == 38) && (myRightPlayer.sy > canvasHeight - 90)) myRightPlayer.vUP = 17;
		if ((key == 87) && (myLeftPlayer.sy > canvasHeight - 90)) myLeftPlayer.vUP = 17; 
		if (key == 80) if (game.pause == true) game.pause = false; else game.pause = true; 
	}
	
	
	function riparti(conf) {
		  
		  contesto.clearRect(0,0,canvasWidth,canvasHeight); 
		  playSound(start);
		  
		  game.start = false;
		  
		  // 0: Player vs Player
		  // 1: Computer vs Player
		  // 2: Player vs Computer
		  // 3: Computer vs Computer
		  game.computer = conf;
		  
		  game.reset();

	}
	
	function diff(val) {
		game.diff = val; 	
	}
	
	function init(){
		playSound(start);
		
		if (canvas.getContext) {
			contesto = canvas.getContext("2d");
			canvasWidth = canvas.width;  
	        canvasHeight = canvas.height; 
			
			myBall = new ball((canvasWidth / 2) + 150,canvasHeight - 200,50);
			myRete = new rectBox((canvasWidth/2)-1,canvasHeight - 200,2,200,"rgb(100,200,100)");
			myLeftPlayer = new Player(100,canvasHeight - 80,0);
			myRightPlayer = new Player(canvasWidth-100,canvasHeight - 80,1);
			
			oggetti.push(myRete);
			oggetti.push(myBall);
			oggetti.push(myLeftPlayer);
			oggetti.push(myRightPlayer);

			window.addEventListener('keydown',doKeyDown,false);
			window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
			window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
		
			setInterval(gameLoop,18); 
		}
	}
	
	var canvas = document.getElementById("canvasvolley");
    var oggetti=[];
	var canvasWidth;
	var canvasHeight;
	var sprite1 = new Image();   sprite1.src = "./sprites/walk2.png"; // gambe animate
	var sprite2 = new Image();   sprite2.src = "./sprites/palla.png"; // palla
	var face1 = new Image();   face1.src = "./sprites/face5.png"; // testa sinistra
	var face2 = new Image();   face2.src = "./sprites/face4.png"; // testa destra
	var counter = 0, fps = 0, frameTime = new Date().getTime();
	
	var boing = new Audio("./suoni/boing.wav");  
	var win = new Audio("./suoni/applause.wav"); 
	var start = new Audio("./suoni/wo.wav"); 
	
	
	