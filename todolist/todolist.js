console.clear()

var add = document.getElementsByClassName("add")[0]
var input = document.getElementsByClassName("input")[0]
var todo_list_block = document.getElementsByClassName("todo_list_block")[0]
var finish_block = document.getElementsByClassName("finish_block")[0]
var index = []
var index_done = []

add.onclick=function(){
  console.log("111")
  var content = input.value.trim();
  if(content == ""){
  alert("尚未輸入項目")
  }else{
  add_item(content)
  input.value=""
  ball.push(new Ball)
  }
};

function add_item(content){
  var item = document.createElement("div")
  var item_text = document.createElement("div")
  var icons = document.createElement("div")
  var icon_trash = document.createElement("div")
  var icon_done = document.createElement("div")

  $(item).addClass("check")
  $(item_text).addClass("todo_item")
  $(icons).addClass("item_icons")
  $(icon_trash).addClass("item_icons_trash")
  $(icon_done).addClass("item_icons_done")
  
  index.push(content)
  index.forEach(p=>{
  $(item_text).html(p)
  })
  
  $(icon_trash).append("<i class="+'"fa fa-trash-o"'+"></i>")
  $(icon_done).append("<i class="+'"fa fa-check"'+"></i>")

  $(icons).append(icon_trash)
  $(icons).append(icon_done)
  $(item).append(item_text)
  $(item).append(icons)

  $(todo_list_block).append(item)

  icon_trash.onclick=function(){
    console.log("trash")
    let temp = $(item).text()
    index.splice(index.indexOf(temp), 1)
    item.parentNode.removeChild(item);
    ball.pop(new Ball)
  }
  
  icon_done.onclick=function(){
    let temp = $(item).text()
    index.splice(index.indexOf(temp), 1)
    item.parentNode.removeChild(item);
    add_item_done(temp)
    ball.pop(new Ball)
  }
}

function add_item_done(content){
  var item = document.createElement("div")
  var item_text = document.createElement("div")
  var icon_trash = document.createElement("div")
  
  $(item).addClass("finish")
  $(item_text).addClass("finish_item")
  $(icon_trash).addClass("finish_icons_trash")
  
  index_done.push(content)
  index_done.forEach(p=>{
                $(item_text).html(p)
                })
  
  $(icon_trash).append("<i class="+'"fa fa-trash-o"'+"></i>")
  
  $(item).append(item_text)
  $(item).append(icon_trash)
  
  $(finish_block).append(item)
  
  icon_trash.onclick=function(){
    console.log("trash_done")
    let temp = $(item).text()
    index_done.splice(index_done.indexOf(temp), 1)
    item.parentNode.removeChild(item);
  }
}



var bgColor ="#273c75"
var ballColor = "#192a56"

var canvas = document.getElementById("bgcanvas")
var ctx = canvas.getContext("2d")

ww = canvas.width = window.innerWidth
wh = canvas.height = window.innerHeight

window.addEventListener("resize",function(){
  ww = canvas.width = window.innerWidth
  wh = canvas.height = window.innerHeight})





var Ball = function(){
  this.p = {
    x: Math.random()*ww,
    y: 0
  }
  this.v = {
    x: Math.random()*10-5,
    y: Math.random()*10-5
  }
  this.a = {
    x: 0,
    y: 0
  }
  this.r = Math.random()*30+30
}

Ball.prototype.draw = function(){
  ctx.beginPath()
  ctx.save()
  ctx.translate(this.p.x,this.p.y)
    ctx.arc(0,0,this.r,0,Math.PI*2)
    ctx.fillStyle = ballColor
    ctx.fill()
  ctx.restore()
}

Ball.prototype.update = function(){
  this.p.x+=this.v.x
  this.p.y+=this.v.y
  this.v.x+=this.a.x
  this.v.y+=this.a.y
  this.checkBoundary() 

}
Ball.prototype.checkBoundary = function(){
  if (this.p.x+this.r>ww){
    this.v.x = -Math.abs(this.v.x)
  }
    if (this.p.x-this.r<0){
    this.v.x = Math.abs(this.v.x)
  }
  if (this.p.y+this.r>wh){
    this.v.y = -Math.abs(this.v.y)
  }
    if (this.p.y-this.r<0){
    this.v.y = Math.abs(this.v.y)
  }
}


var ball = []

function init(){
  
}
init()

//固定時間的更新
function update(){
  ball.forEach(b=>{b.update()})
}
setInterval(update,30)

function draw(){
  ctx.fillStyle=bgColor
  ctx.fillRect(0,0,ww,wh)
  ball.forEach(b=>{b.draw()})
  setTimeout(draw,1000/30)
}
draw()
