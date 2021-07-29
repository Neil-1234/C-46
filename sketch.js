var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var obstacleBottomGroup;
var gameover,gameroverImg,restart,restartImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameoverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");

}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3;


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gameover = createSprite(100,100);
gameover.addImage(gameoverImg);
gameover.scale = 0.5;
gameover.visible = false;

restart = createSprite(100,150);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

obstacleBottomGroup = new Group();

}

function draw() {

  
  background(bgImg);
  
        //console.log(score);
        if(gameState === PLAY){
        //making the hot air balloon jump
        if(keyDown("up")) {
        balloon.velocityY = -6 ;
            
        } 

        //adding gravity
        balloon.velocityY = balloon.velocityY + 2;

 
        Bar();
        //spawning top obstacles
        spawnObstaclesTop();
        spawnObstaclesBottom();
        if(obstacleBottomGroup.isTouching(balloon)){
          gameState = END;
        }
        else{
          score = score+1;
        }
        if(keyDown("space")){
          console.log("restart game")
          reset();
        }
        }
        else{
          gameover.visible = true;
          //restart.visible = true;
        }
        fill("white");
        textSize(20);
        noStroke();
        text("Score:"+score,350,50);
   
        drawSprites();
       
        

      
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  gameover.visible = false;
}
function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}

function spawnObstaclesBottom(){
  if(World.frameCount % 60 === 0) {
    obstacleBottom = createSprite(400,310,40,50);

obstacleBottom.addImage(obsBottom1);

obstacleBottom.scale = 0.1;
obstacleBottom.velocityX = -4;

//random y positions for top obstacles
//obstacleBottom.y = Math.round(random(10,100));

//generate random top obstacles
var rand = Math.round(random(1,3));
switch(rand) {
  case 1: obstacleBottom.addImage(obsBottom1);
          break;
  case 2: obstacleBottom.addImage(obsBottom2);
          break;
  case 3: obstacleBottom.addImage(obsBottom3);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleBottom.lifetime = 100;

//balloon.depth = balloon.depth + 1;
obstacleBottomGroup.add(obstacleBottom);
  }
}




  
