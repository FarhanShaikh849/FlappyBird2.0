var SERVE = 0;
var INSTRUCTION = 1;
var PLAY = 2;
var END = 3;
var gameState = SERVE;

var flappyBird, flappyBirdImg;
var backgroundImg;
var obstacle1, obstacle1Img, obstacle2, obstacle2Img;
var gameOver, gameOverImg;
var line1, line2;
var healthBar1, healthBar2, healthBar3;
var leftArrow, leftArrowImg, rightArrow, rightArrowImg;
var border1, border2, border3;

var score = 0;

var health = 3;

function preload(){

  flappyBirdImg = loadImage("flappy0.png");

  backgroundImg = loadImage("bg0.jpg");

  obstacle1Img = loadImage("obstacle.jpg");
  obstacle2Img = loadImage("obstacle2.jpg");

  gameOverImg = loadImage("over.png");

  leftArrowImg = loadImage("arrowLeft.png");
  rightArrowImg = loadImage("arrowRight.png");

}

function setup() {
  createCanvas(1500, 600);

  rectMode(CENTER);

  line1 = createSprite(750,599,1500,5);
  line1.visible = false;

  line2 = createSprite(750,1,1500,5);
  line2.visible = false;

  gameOver = createSprite(750,250,0,0);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  flappyBird = createSprite(100,300,50,50);
  flappyBird.addImage(flappyBirdImg);
  flappyBird.scale = 0.12;

  healthBar1 = createSprite(235,41,75,20);
  healthBar1.shapeColor = "green";

  healthBar2 = createSprite(315,41,75,20);
  healthBar2.shapeColor = "green";

  healthBar3 = createSprite(395,41,75,20);
  healthBar3.shapeColor = "green";

  leftArrow = createSprite(1470,300,0,0);
  leftArrow.addImage(leftArrowImg);
  leftArrow.scale = 0.1;
  leftArrow.visible = false;

  rightArrow = createSprite(1000,300,0,0);
  rightArrow.addImage(rightArrowImg);
  rightArrow.scale = 0.1;
  rightArrow.visible = false;
  
  border1 = createSprite(1040,300,7.5,525);
  border1.shapeColor = "black";
  border1.visible = false;

  border2 = createSprite(1267.5,35,462.5,7.5);
  border2.shapeColor = "black";
  border2.visible = false;

  border3 = createSprite(1267.5,565,462.5,7.5);
  border3.shapeColor = "black";
  border3.visible = false;

  obstacle1Group = new Group();
  obstacle2Group = new Group();

  flappyBird.setCollider("circle",0,0,150);
  //flappyBird.debug = true

  score = 0;
  health = 3;
  
}

function draw() {

  background(backgroundImg);

  textSize(25);
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Score: "+ score, 75, 100);
  text("Health: "+ health, 75, 50);

  if(gameState === SERVE){

    leftArrow.visible = true;
    rightArrow.visible = false;
    border1.visible = false;
    border2.visible = false;
    border3.visible = false;

    textSize(35);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("Note: Press The Arrow On The Right To See Instructions.", 300, 260)
    text("Press S To Start", 600, 340);

    if(mousePressedOver(leftArrow)){
      gameState = INSTRUCTION;
    }

    if(keyDown("S")){
      gameState = PLAY;
    }

  }

  if(gameState === INSTRUCTION){
    
    leftArrow.visible = false;
    rightArrow.visible = true;
    border1.visible = true;
    border2.visible = true;
    border3.visible = true;

    textSize(35);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("Note: Press The Arrow On The Right To See In", 300, 260)
    text("Press S To Start", 600, 340);

    textSize(35);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("Instructions:",1170,90);
    text("Press S To Start",1140,510);

    textSize(25);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("Press Space To Move Upwards Against",1055,165);
    text("The Gravity.",1055,200);
    text("Whenever You Lose A Health The",1055,265);
    text("Gravity Will Increase Especially",1055,300);
    text("When You Touch The Lower Ground.",1055,335);
    text("You Have A Maximum Of 3 Health And",1055,400);
    text("When The Health Goes 0 You Will Lose.",1055,435);

    if(mousePressedOver(rightArrow)){
      gameState = SERVE;
    }

    if(keyDown("S")){
      gameState = PLAY;
    }

  }

  if(gameState === PLAY){

    leftArrow.visible = false;
    rightArrow.visible = false;
    border1.visible = false;
    border2.visible = false;
    border3.visible = false;

    score = score + Math.round(getFrameRate()/60);

    //For applying gravity
    flappyBird.velocityY = flappyBird.velocityY + 0.8;

    if(keyDown("space")){
      flappyBird.velocityX = +0.3;
      flappyBird.velocityY = -10;
    }

    if(obstacle1Group.isTouching(flappyBird) || obstacle2Group.isTouching(flappyBird)){
      health = health -1;
      flappyBird.x = 100;
      flappyBird.y = 300;
    }

    if(line1.isTouching(flappyBird) || line2.isTouching(flappyBird)){
      health = health -1;
      flappyBird.x = 100;
      flappyBird.y = 300;
    }

    if(health === 2){
      healthBar3.visible = false;
    }

    if(health === 1){
      healthBar2.visible = false;
      healthBar3.shapeColor = false;
    }

    if(health === 0){
      healthBar1.visible = false;
      healthBar2.visible = false;
      healthBar3.visible = false;
      gameState = END;
    }

    obstacle1Spawn();
    obstacle2Spawn();
  }

  if(gameState === END){

    gameOver.visible = true;

    textSize(30);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("You Lost!", 700, 400);

    flappyBird.velocityX = 0;
    flappyBird.velocityY = 0;

    obstacle1Group.setVelocityXEach(0);
    obstacle2Group.setVelocityXEach(0);

    obstacle1Group.setLifetimeEach(-1);
    obstacle2Group.setLifetimeEach(-1);

  }

  drawSprites();
}

function obstacle1Spawn(){
  if(frameCount % 150 === 0){
    obstacle1 = createSprite(1500,0,0,0);
    obstacle1.y = Math.round(random(30,100));
    obstacle1.addImage(obstacle1Img);
    obstacle1.scale = 2.5;
    obstacle1.velocityX = -3;
    obstacle1.lifetime = 510;
    obstacle1Group.add(obstacle1);
  }
}

function obstacle2Spawn(){
  if(frameCount % 150 === 0){
    obstacle2 = createSprite(1500,0,0,0);
    obstacle2.y = Math.round(random(500,550));
    obstacle2.addImage(obstacle2Img);
    obstacle2.scale = 2.5;
    obstacle2.velocityX = -3;
    obstacle2.lifetime = 510;
    obstacle2Group.add(obstacle2);
  }
}