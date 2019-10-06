//player settings
var player;
var xpos, ypos;

//physics variables
var target,force, vel,ctx,drag,strength,dragSlider, strengthSlider;

var lives = 3;
var playeralpha = 300;
var collision;
var counter;
var loselife;


var star = [];
var star_xpos, star_ypos;

var planets = [];

//initial speed of planets
var speed = 3;


function setup() {
  createCanvas(window.innerWidth, 640);
  xpos = 100;
  ypos = 300;

  //set initial star position
  for (var i = 1000; i >= 0; i--) {
    star[i] = random (640);
  };

  //create planet object
  for (let i=0; i<5; i++){
    planets.push(new Planet());
  }

  player = new Player();
  counter = 0;

  //set physics settings
  //target indicates where the player will go
  //initially set target to the ypos so it does not move on loading
  target = ypos;
  vel =0;
  
  //drag is bounciness level
  drag = 0.1; 
  //strength makes it feel like its floating
  strength = 0.05; 
}

function draw() {
	background(0);
  
  //stars
  for (let i = 0; i < 1000; i += 1) {
    fill(255);
    ellipse(i*2, star[i], 2, 2);
  }

  //planets
  for (let i =0; i <planets.length; i++){
    planets[i].move();
    planets[i].display();
   // planets[i].intersects();
  };


  //physics movement variables
  force = target - ypos;
  force *= strength;
  vel *= drag;
  vel+= force;
  ypos +=vel;

  fill(255);
  textSize(32);
  text('Lives: '+ lives, 10, 30);

  

  player.display();

  //opacity changes when player is hit and loses a life
  if (collision == true){
      //loselife = true;
      playeralpha = 150;

      counter ++;
      if (counter > 100){
        counter = 0;
        playeralpha = 300;
        collision = false;
      }
  }

  if (loselife == true){
    var loseonelife = 0;
    for (var i = 0; i >= 1; i++) {
      loseonelife ++;
      lives --;
      loseonelife = 0;
      loselife = false;
    }

  }

 

  //bounds added to player to stay within window
  if (ypos >= 600){
    ypos = 600;
  }
  else if (ypos <= 40){
    ypos = 40;
  }

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    player.moveDown();
  }
}

class Player{
  constructor(){
    this.x = xpos;
    this.y = ypos;
    //this.speed = 5;
  }

  //when player moves up, adjust ypos to -100 of where the user current is
  moveUp(){
    target = ypos - 100;
  }

  //when player moves down, adjust ypos to +100 of where the user current is
  moveDown(){
    target = ypos + 100;
  }

  display(){
    noStroke();
    fill(200,20,50, playeralpha);
    ellipse(xpos, ypos, 80, 80);
  }

  //blink effect when player loses life
  collision(){
    for (var i = 0; i < 120; i ++){
      if (i< 100){
        playeralpha = 50;
        console.log(playeralpha);
      }
      else{
        playeralpha = 200;
        console.log(playeralpha);
        collision = false;

      }
    }
  }
}

class Planet{
  constructor(){
    this.x = random(window.innerWidth)+400;
    this.y = random(600);
    this.diameter = random(30,60);
    this.speed = random(1, speed);
  }

  move(){
    this.x -= this.speed;
  }

  display(){
    noStroke();
    fill(20,10,200);
    ellipse(this.x, this.y, this.diameter, this.diameter);

    //loop planets to the right side of the screen when they passed
    if (this.x <= -30){
      this.x = window.innerWidth + 50;
      this.y = random(600);
    }

    //collision detection
    var distance = dist(this.x, this.y, xpos, ypos);

     if (distance < (this.diameter/2) + 40){
      fill(250,0,0);
      rect(0, 400, 400, 400);
      collision = true;
      this.x = -50;
      //player.collision();
    }
  }

}

//window resize for width
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w,h);
  width = w;
  height = h;
}