console.clear()

var boardHeight = getRandom(300)
var key_down = false

function getRandom(x){
    return Math.random()*x
};

var GameObject = function (position,size,selector){
  this.$el = $(selector)
  this.position = position
  this.size = size
  this.$el.css("position","absolute")
  this.updateCss()
}
//更新遊戲物件(資料->實際的css)
GameObject.prototype.updateCss = function(){
  this.$el.css("left",this.position.x+"px")
  this.$el.css("top",this.position.y+"px")
  this.$el.css("width",this.size.width+"px")
  this.$el.css("height",this.size.height+"px")
}
//偵測遊戲物件碰撞
GameObject.prototype.collide = function(otherObject){
  let pos = otherObject.position
  let inXrange = pos.x >= this.position.x && pos.x <= this.position.x + this.size.width
  let inYrange =  pos.y >= this.position.y && pos.y <= this.position.y + this.size.height
  return inXrange && inYrange
}


//板子
var Board = function(position,size,selector){
  this.moveSpeed = 4
  GameObject.call(this,position,size,selector)
}
Board.prototype = Object.create(GameObject.prototype)
Board.prototype.constructor = Board.constructor
Board.prototype.moveUp = function(){
  this.position.x -= this.moveSpeed
  this.updateCss()
  if (this.position.x<-100){
    this.position.x = 500
    boardHeight = getRandom(300)
    this.size.height = boardHeight
    this.updateCss()
  }
}
Board.prototype.moveDown = function(){
  this.position.x -= this.moveSpeed
  this.updateCss()
  if (this.position.x<-100){
    this.position.x = 500
    this.size.height = 300-boardHeight
    this.position.y = 500-this.size.height
    this.updateCss()
  }
}

//玩家
var Player = function(position){
  this.size = {width: 20, height: 20}
  this.position = position 
  this.gravity = 6
  GameObject.call(this,this.position,this.size,".player")
}
Player.prototype = Object.create(GameObject.prototype)
Player.prototype.constructor = Player.constructor

Player.prototype.control = function(){
    let _this = this
    $(window).keydown(function(event){
    // if(key_down==false){
        key_down = true;
        _this.position.y -= 60;
        console.log(key_down);
    // }
    })
    // $(window).keyup(function(event){
    //     key_down = false;
    //     console.log(key_down);
    // })
} 
Player.prototype.update = function(){
    let _this = this
    this.position.y += this.gravity
    this.updateCss()
    if (this.position.y < -30 || this.position.y > 500){
    _this.gravity = 0
    console.log("out")
    _this.position.y = 100
    game.endGame()
    }
}
//遊戲
var Game = function (){
    this.grade=0
}
Game.prototype.endGame = function(){
    clearInterval(this.timer)
    $(".info").show()
    $(".score").hide()
    $(".start").text("Try Again")
    $(".start").show()
    $(".infoText").text("Score:"+this.grade)
    console.log("end")
    clearInterval(this.startGameMain)
}
Game.prototype.startGame = function(){
    let time = 3
    let _this = this
    this.grade=0
    $(".start").hide()
    $(".infoText").text("Ready")
    $(".score").text("Score:"+this.grade)
    
    
    
    this.start = setInterval(function(){
    $(".infoText").text(time)
    time--
    if(time<=0){
        $(".info").hide()
        $(".score").show()
        _this.startGameMain()
        clearInterval(_this.start )
    }
    },1000)
}

 
Game.prototype.startGameMain = function(){
    let _this = this
    var player = new Player({x: 100,y: 100})
    player.control()
    var board1 = new Board({x: 300,y: 0},{width: 100,height: 150},".b1")
    var board2 = new Board({x: 300,y: 350},{width: 100,height: 150},".b2")
    var board3 = new Board({x: 600,y: 0},{width: 100,height: 150},".c1")
    var board4 = new Board({x: 600,y: 350},{width: 100,height: 150},".c2")

  
  this.timer = setInterval(function(){
    if(board1.collide(player)){
      console.log("Hit")
      game.endGame()
    }
    if(board2.collide(player)){
      console.log("Hit")
      game.endGame()
    }
    if(board3.collide(player)){
      console.log("Hit")
      game.endGame()
    }
    if(board4.collide(player)){
      console.log("Hit")
      game.endGame()
    }
    if(board1.position.x==0||board3.position.x==0){
      _this.grade += 1
      $(".score").text("Score:"+_this.grade)
    }
    player.update()
    board1.moveUp()
    board2.moveDown()
    board3.moveUp()
    board4.moveDown()
  },30)
}
var game = new Game()
