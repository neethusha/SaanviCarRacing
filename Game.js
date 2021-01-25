class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var firstPlayerCount=await database.ref('playerCount').once("value");
      if(firstPlayerCount.exists()){
        playerCount=firstPlayerCount.val()
        player.getCount();
      }
     
      form = new Form()
      form.display();
    }
    car1=createSprite(100,displayHeight-100);
    car2=createSprite(300,displayHeight-100);
    car3=createSprite(500,displayHeight-100);
    car4=createSprite(700,displayHeight-100);
    cars=[car1,car2,car3,car4]
  }
  play(){
    form.hide();
    textSize(30);
    text("Game Starting...",120,100);
    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      var index=0;
      var x=0,y;
    
      console.log("Entering For Loop: ");
      for(var plr in allPlayers){
        
        index=index+1;
        if(index===player.index){
          cars[index-1].shapeColor="red"; //                moved, added quotes 
        }
        console.log("Loop + " + index);
        console.log(plr);
       
        x=x+200;
        y=(displayHeight-100)-allPlayers[plr].distance;
        console.log("x " +x);
        console.log("y " +y);
        cars[index-1].x=x;
        cars[index-1].y=y;
     
       console.log("index " + index);
       console.log("player.index " + player.index);
        
      }
    }
    if(keyDown(UP_ARROW) && player.index !==null){
      player.distance+=50;
      player.update();
    }
  
  drawSprites();   //************moved
  }
}