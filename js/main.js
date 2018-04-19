var canvas = document.getElementById('main-game');
var ctx = canvas.getContext('2d')

var audio = ['./assets/speedotromaSong.wav']
var images =['./assets/player/running.png','./assets/player/runningp2.png','./assets/crazyhead.png']

var red = 255
var green;
var redDir = true;
var color = 'rgb('+red+green+',145)'

var gravity = .2
var friction = .5;


var background = new Background();
var player = new Player(images[0]);
var player2 = new Player2(images[1]);
var blocks = [];
var structures = [];
var interval = 0;
var frames = 0;
var crazyhead = new CrazyHead()
var mainmenuframes = 0

function changeColor(){
  if(redDir){
    red-=.25 
  }
  if(!redDir){
    red+=.25
  }
  if(red === 255)redDir = true
  if(red === 0)redDir = false
  green = red - 50
  color = 'rgb('+red+','+green+',145)';
}

function generateBlocks(){
  if(!(frames % 16 === 0)) return
  var block = new Block(null,canvas.height - 32)
  blocks.push(block)
}

function generateStructures(){
  if(!(frames % 160 === 0)) return
  var randomStructure = Math.floor(Math.random()*5)
  var structure = new Structure()
  structures.push(structure.structureSelector[3])
}

function drawBlocks(){
  blocks.forEach(function(block){
    block.draw()
  })
    structures.forEach(function(st){
      st.forEach(function(block){
        block.draw()
      });
    })
  
}

function deleteBlocks(){
  blocks.forEach(function(block){
    if(block.x < -32){
      blocks.shift(block)
    }
  })
  structures.forEach(function(st){
    st.forEach(function(block){
        if(block.x < -300){
          st.shift(block)
        }
      });
  })
}

function collisionChecker(){
  player.grounded = false;
  blocks.forEach(function(block){
    var direction = isTouching(player,block);
    if(direction == "left" || direction == "right"){
      player.velX = 0;
    }else 
    if(direction == "bottom"){
      player.jumping = false;
      player.grounded = true;
    } 
    else if(direction == "top"){
      //player.velY *= -1
   }
  })
  structures.forEach(function(st){
    st.forEach(function(block){
      if(block instanceof Block){
        var direction = isTouching(player,block);
        if(direction == "left" || direction == "right"){
          player.velX = 0;
        }else 
        if(direction == "bottom"){
          player.jumping = false;
          player.grounded = true;
        } 
        else if(direction == "top"){
          player.velY *= -1
      }
    }
      if(block instanceof StickyBlock){
        var direction = isTouching(player,block);
        if(direction == "left" || direction == "right"){
          player.velX = 0;
        }else 
        if(direction == "bottom"){
          player.jumping = false;
          player.grounded = true;
        } 
        else if(direction == "top"){
          player.frame = 5
          player.velY = 0
      }
      }
      if(block instanceof SpikeBlock){
        var direction = isTouching(player,block);
        if(direction)gameOver()
      }
    })
  })
  if(player.grounded){
    player.velY = 0;
  }
}
function collisionCheckerP2(){
  player2.grounded = false;
  blocks.forEach(function(block){
    var direction = isTouching(player2,block);
    if(direction == "left" || direction == "right"){
      player2.velX = 0;
    }else 
    if(direction == "bottom"){
      player2.jumping = false;
      player2.grounded = true;
    } 
    else if(direction == "top"){
      //player.velY *= -1
   }
  })
  structures.forEach(function(st){
    st.forEach(function(block){
      
      if(block instanceof Block){
        var direction = isTouching(player2,block);
        if(direction == "left" || direction == "right"){
          player2.velX = 0;
        }else 
        if(direction == "bottom"){
          player2.jumping = false;
          player2.grounded = true;
        } 
        else if(direction == "top"){
          player2.velY *= -1
      }
    }
      if(block instanceof StickyBlock){
        var direction = isTouching(player2,block);
        if(direction == "left" || direction == "right"){
          player2.velX = 0;
        }else 
        if(direction == "bottom"){
          player2.jumping = false;
          player2.grounded = true;
        } 
        else if(direction == "top"){
          player2.frame = 5
          player2.velY = 0
      }
      }
      if(block instanceof SpikeBlock){
        var direction = isTouching(player2,block);
        if(direction){
          gameOver()
        } 
      }
    })
  })
  if(player2.grounded){
    player2.velY = 0;
  }
}
function isTouching(char, block){
  var vectorX = (char.x + (char.width/2)) - (block.x + (block.width/2));
  var vectorY = (char.y + (char.height/2)) - (block.y + (block.height/2));
  
  var halfWidths = (char.width/2) + (block.width/2);
  var halfHeights = (char.height/2) + (block.height/2);
  
  var collisionDirection = null;
  
  if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){
    var offsetX = halfWidths - Math.abs(vectorX);
    var offsetY = halfHeights - Math.abs(vectorY);
    if(offsetX < offsetY){
      if(vectorX > 0){
        collisionDirection = "left";
        char.x += offsetX;
      }else{
        collisionDirection = "right";
        char.x -= offsetX;
      }
    }else{
      if(vectorY > 0){
        collisionDirection = "top";
        //char.y += offsetY;
      }else{
        collisionDirection = "bottom";
        char.y -= offsetY;
      }
    }
  }
  return collisionDirection;
  
}
function start(){
document.getElementById('start').classList.add('displaynone')
document.getElementById('start2p').classList.add('displaynone')
clearInterval(intervalmainmenu)
  if(interval > 0)return
    interval = setInterval(function(){
      update1p()
    },1000/60)
}
function start2p(){
  document.getElementById('start').classList.add('displaynone')
  document.getElementById('start2p').classList.add('displaynone')
  clearInterval(intervalmainmenu)
    if(interval > 0)return
      interval = setInterval(function(){
        update2p()
      },1000/60)
  }
function pause(){
  clearInterval(interval)
}
function gameOverChecker(){
  if(player.x + player.width < 0 || player.y - 10 > canvas.height)gameOver()
  if(player2.x + player2.width < 0 || player2.y - 10 > canvas.height)gameOver()
}
function gameOver(){
  pause()
  document.getElementById('gameover').classList.toggle("displaynone")
  setInterval(function(){
    mainmenuframes++
    finalAnimation()
  },1000/60)

}
function finalAnimation(){
  crazyhead.draw()
}
function update1p(){
  changeColor()
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  background.draw();
  generateBlocks();
  generateStructures();
  drawBlocks();
  deleteBlocks();
  collisionChecker()
  player.runAnimation();
  player.move()
  gameOverChecker()
}

function update2p(){
  changeColor()
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  background.draw();
  generateBlocks();
  generateStructures();
  drawBlocks();
  deleteBlocks();
  collisionChecker()
  collisionCheckerP2()
  player.runAnimation();
  player.move()
  player2.runAnimation();
  player2.move()
  gameOverChecker()
}

function restart(){
 
}

function updateMainMenu(){
  changeColor()
  ctx.clearRect(0,0,canvas.width,canvas.height)
  background.draw();
  crazyhead.draw()
  mainmenuframes++
  
}

document.getElementById('start').addEventListener('click',start)
document.getElementById('start2p').addEventListener('click',start2p)
document.getElementById('gameover').addEventListener('click',restart)
document.body.addEventListener("keydown", function (e) {
  player.keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
  player.keys[e.keyCode] = false;
});

document.body.addEventListener("keydown", function (e) {
  player2.keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
  player2.keys[e.keyCode] = false;
});

var intervalmainmenu = setInterval(function(){
  if(interval === 0){
    updateMainMenu()
  }
},1000/60)

musica = new Audio()
musica.src = audio[0]
musica.loop = true;
musica.play();

 