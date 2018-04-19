//constructores
function Background(){
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.imgMountainsOrange = new Image()
  this.imgMountainsOrange.src = './assets/montañasNaranja.png'
  this.imgMountainsPurple = new Image()
  this.imgMountainsPurple.src = './assets/montañasRosa.png'
  this.imgMountainsOrange2 = new Image()
  this.imgMountainsOrange2.src = './assets/montañasNaranja2.png'
  this.imgMountainsPurple2 = new Image()
  this.imgMountainsPurple2.src = './assets/montañasRosa2.png'

  this.move = function(){
    if(this.x < -this.width * 2) this.x = 0;
    this.x-= 7;
  }
  this.draw = function(){
    this.move()
    this.drawSky(color);
    this.drawMountain2(this.x)
    this.drawMountain1(this.x)

  }

  this.drawSky = function(x){
      ctx.fillStyle = x
      ctx.fillRect(this.x,this.y,this.width * 3,this.height)
  }

  this.drawMountain1 = function(){
    ctx.drawImage(this.imgMountainsOrange,this.x * 2,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange2,this.x*2 +this.width,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange,this.x*2 + this.width * 2,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange2,this.x*2 + this.width * 3,this.y + 70,this.width,this.height)
    ctx.drawImage(this.imgMountainsOrange,this.x*2 + this.width * 4,this.y + 70,this.width,this.height)
  }
  this.drawMountain2 = function(){
    ctx.drawImage(this.imgMountainsPurple,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.imgMountainsPurple2,this.x + this.width,this.y,this.width,this.height)
    ctx.drawImage(this.imgMountainsPurple,this.x + this.width * 2,this.y,this.width,this.height)
  }
}
function CrazyHead(){
  this.x = 340
  this.y = 100
  this.width = 320;
  this.height = 160;
  this.frame = 0
  this.img = new Image()
  this.img.src = images[2]
  this.img.onload = function(){
    this.draw()
  }.bind(this)
  this.draw = function(){
    ctx.drawImage(this.img,this.frame * 320,0,this.width,this.height, this.x, this.y,this.width,this.height)
    if(mainmenuframes % 32 === 0)this.frame++
    if(this.frame > 1) this.frame = 0
  }

}
function Block(x,y){
  this.x = x ? x : canvas.width
  this.y = y;
  this.width = 32;
  this.height = 32;
  this.img = new Image()
  this.img.src = './assets/block.png'

  this.draw = function(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    this.x-=2
  }
}
function SpikeBlock(x,y){
  this.x = x ? x : canvas.width
  this.y = y;
  this.width = 32;
  this.height = 40;
  this.img = new Image()
  this.img.src = './assets/spikeblock.png'

  this.draw = function(){
    ctx.drawImage(this.img,this.x,this.y - 8,this.width,this.height)
    this.x-=2
  }
}
function LadderBlock(x,y){
  this.x = x ? x : canvas.width
  this.y = y;
  this.width = 32;
  this.height = 32;
  this.img = new Image()
  this.img.src = './assets/stairblock.png'

  this.draw = function(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    this.x -= 2
  }
}
function StickyBlock(x,y){
  this.x = x ? x : canvas.width
  this.y = y;
  this.width = 32;
  this.height = 36;
  this.img = new Image()
  this.img.src = './assets/stickyblock.png'

  this.draw = function(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    this.x -= 2
  }
}
function Structure(){
  this.x                  = canvas.width
  this.y                  = canvas.height - 64
  this.structureSelector  = [
                              [ new Block(this.x + 160,this.y),
                                new Block(this.x,this.y -32),
                                new Block(this.x+32,this.y -32),                               
                                new Block(this.x + 160,this.y -32),
                                new Block(this.x,this.y -64),
                                new Block(this.x + 128,this.y -64),
                                new Block(this.x + 160,this.y -64),
                                new Block(this.x,this.y -96),
                                new Block(this.x,this.y -128),
                                new Block(this.x,this.y -160),
                                new Block(this.x + 32,this.y -160),
                                new StickyBlock(this.x + 64,this.y -160),
                                new StickyBlock(this.x + 96,this.y -160),
                                new StickyBlock(this.x + 128,this.y -160),
                                new Block(this.x + 160,this.y -160),
                              ],
                              [ new Block(this.x,this.y),
                                new Block(this.x + 32,this.y),
                                new Block(this.x + 64,this.y),
                                new Block(this.x + 224,this.y),
                                new Block(this.x + 256,this.y),
                                new Block(this.x + 32,this.y - 32),
                                new Block(this.x + 64,this.y - 32),
                                new Block(this.x + 128,this.y - 32),
                                new Block(this.x + 160,this.y - 32),
                                new Block(this.x + 256,this.y - 32),
                                new Block(this.x + 64,this.y - 64),
                                new Block(this.x + 128,this.y - 64),
                                new Block(this.x + 128,this.y - 96),
                                new Block(this.x + 160,this.y - 96),
                                new Block(this.x + 192,this.y - 96),
                                new Block(this.x + 224,this.y - 96),
                                new Block(this.x + 256,this.y - 96)
                              ],
                              [ new Block(this.x,this.y),
                                new Block(this.x + 128,this.y),
                                new Block(this.x + 160,this.y),
                                new Block(this.x + 192,this.y),
                                new Block(this.x + 64,this.y - 32),
                                new Block(this.x + 160,this.y - 32),
                                new Block(this.x + 192,this.y - 32),
                                new LadderBlock(this.x + 32,this.y - 64),
                                new Block(this.x + 64,this.y - 64),
                                new Block(this.x + 96,this.y - 64),
                                new Block(this.x + 192,this.y - 64),
                                new LadderBlock(this.x + 32,this.y - 96),
                                new Block(this.x + 192,this.y - 96),
                                new Block(this.x + 96,this.y - 128),
                                new Block(this.x + 128,this.y - 128),
                                new Block(this.x + 160,this.y - 128),
                                new Block(this.x + 192,this.y - 128),
                              ],
                              [ new Block(this.x,this.y),
                                new SpikeBlock(this.x + 32,this.y + 31.5),
                                new Block(this.x + 64,this.y),
                                new SpikeBlock(this.x + 96,this.y + 31.5),
                                new Block(this.x + 128,this.y)
                              ],
                              [ new Block(this.x,this.y),
                                new SpikeBlock(this.x + 32,this.y + 31.5),
                                new Block(this.x + 64,this.y),
                                new Block(this.x + 128,this.y),
                                new SpikeBlock(this.x + 96,this.y + 31.5),
                                new Block(this.x + 64,this.y-32),
                                new Block(this.x + 128,this.y-32),
                              ],
                              [ 
                                new Block(this.x + 64,this.y-32),
                                new Block(this.x + 128,this.y-32),
                              ]
                            ]
  this.img = new Image()
  this.img.src = './assets/block.png'

  this.draw = function(){
    structures.push(this.structureSelector[structureNumber])
  this.x -= 2
}
}
function Player(image){
  this.x         = canvas.width + 40;
  this.y         = 500;
  this.width     = 20;
  this.height    = 29;

  this.jumping   = false;
  this.jumpStrength = 2
  this.velY = 0;
  this.velX = 0;
  this.speed = 3;
  this.grounded = false
  this.keys = []

  this.frame     = 2;
  this.sheet     = new Image()
  this.sheet.src = image
 

  this.runAnimation = function () {
    this.x-=2
    ctx.drawImage(this.sheet,this.frame * 21 ,0,this.width,this.height + 2, this.x, this.y,this.width,this.height)

    this.y += this.velY;
    this.velY += gravity;
    
    this.x += this.velX;
    this.velX *= friction;
  }
  this.move = function(){
    if(this.keys[38]){
      if(!this.jumping){
        this.velY = -this.jumpStrength * 2;
        this.velY -= 1;
        this.jumping = true;

      }
    }

    if (this.keys[39]) {
      
      if(frames % 8 === 0){
        this.frame++
        if(this.frame > 3) this.frame = 2
      }

        if (this.velX < this.speed) {
            this.velX+=1.1;
        }
    }
    if (this.keys[37]) {
      if(frames % 8 === 0){
        this.frame++
        if(this.frame > 1) this.frame = 0
      }
        if (this.velX > -this.speed) {
            this.velX-=1.1;
        }
    }


}
}
function Player2(image){
  this.x         = canvas.width + 30;
  this.y         = 500;
  this.width     = 20;
  this.height    = 29;

  this.jumping   = false;
  this.jumpStrength = 2
  this.velY = 0;
  this.velX = 0;
  this.speed = 3;
  this.grounded = false
  this.keys = []

  this.frame     = 2;
  this.sheet     = new Image()
  this.sheet.src = image
 

  this.runAnimation = function () {
    this.x-=2
    ctx.drawImage(this.sheet,this.frame * 21 ,0,this.width,this.height + 2, this.x, this.y,this.width,this.height)

    this.y += this.velY;
    this.velY += gravity;
    
    this.x += this.velX;
    this.velX *= friction;
  }
  this.move = function(){
    if(this.keys[87]){
      if(!this.jumping){
        this.velY = -this.jumpStrength * 2;
        this.velY -= 1;
        this.jumping = true;

      }
    }

    if (this.keys[68]) {
      
      if(frames % 8 === 0){
        this.frame++
        if(this.frame > 3) this.frame = 2
      }

        if (this.velX < this.speed) {
            this.velX+=1.1;
        }
    }
    if (this.keys[65]) {
      if(frames % 8 === 0){
        this.frame++
        if(this.frame > 1) this.frame = 0
      }
        if (this.velX > -this.speed) {
            this.velX-=1.1;
        }
    }


}
}