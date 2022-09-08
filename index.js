//canvas
var canvas = document.getElementById("banner")
var ctx = canvas.getContext("2d")

wh=canvas.height = window.innerHeight*0.8
ww=canvas.width = window.innerWidth

window.addEventListener("resize",function(){
    ww = canvas.width = window.innerWidth
    wh = canvas.height = window.innerHeight})


var bgColor = "#100F0F"



// Vec----------

class Vec{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    set(x,y){
        this.x =x
        this.y =y
    }
        move(x,y){
        this.x+=x
        this.y+=y
    }
    get length(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    set length(nv){
        let temp = this.unit.mul(nv)
        this.set(temp.x,temp.y)
    }
    clone(){
        return new Vec(this.x,this.y)
    }
}

//-----circle
class Circle{
    constructor(args){
        let def = {
            p: new Vec(),
            r: 20,
            color: "white",
            alpha: 1,
        }
        Object.assign(def,args)
        Object.assign(this,def)
    }
    
    update(){
        this.r*=1.05
        this.alpha*=0.9
        var cs = circles.slice()
        cs.forEach((p,pid)=>{
            if (p.r>200){
            let d = cs.splice(pid,1)
            }
        })
        circles=cs
        }
    draw(){
        ctx.save()
            ctx.translate(0,0)
            ctx.beginPath()
            ctx.arc(this.p.x,this.p.y,this.r,0,Math.PI*2)
            ctx.strokeStyle = this.color
            ctx.globalAlpha = this.alpha;
            ctx.stroke()
        ctx.restore()
    }
    }


//打字效果-------
class Text {
    constructor(args){
        let def = {
            text: "",
            p: new Vec(),
            font_size: 6,
            num: 0, //第幾個字
            char: "", //選出來的字
            finish: false,
        }
        Object.assign(def,args)
        Object.assign(this,def)
    }

    pick_text(){
        let temp = this.text[this.num++]
        // console.log(this.num)
        if(!temp){
            temp = ""
            this.finish = true
        }
        this.char +=temp
    }

    draw_text(){
        ctx.beginPath()
        //文字
        ctx.font = `${this.font_size}em Arial`
        ctx.fillStyle = "white"
        ctx.fillText(this.char,this.p.x,this.p.y)
        //輸入線(沒做)
        ctx.closePath()
    }

    loop(){
        this.char = ""
        this.num = 0
        this.finish = false
    }
}



//--------程式---

circles = []

text = new Text({
    text: "Hi,I'm Benny.",
    p: new Vec(100,250),
    font_size: 6,
})

small_text = new Text({
    text: "welcome to my profile.",
    p: new Vec(100,350),
    font_size: 3,
})



function init(){

}
init()

function update(){
    circles.forEach(c=>{c.update()})
}
setInterval(update,30)

function text_update(){
    text.pick_text()
    if(text.finish){
        small_text.pick_text()
    }
    if(small_text.finish){ 
        setTimeout("text.loop()", 1800)
        setTimeout("small_text.loop()", 1800)
    }
}
setInterval(text_update,200)

function draw(){
    ctx.fillStyle=bgColor
    ctx.fillRect(0,0,ww,wh)
    // ------繪製區域-----

    //點擊圓圈
    circles.forEach(c=>c.draw())

    //四個角落十字
    let crosses= [
        new Vec(50,50),
        new Vec(ww-50,50),
        new Vec(50,wh-50),
        new Vec(ww-50,wh-50)
    ]
    crosses.forEach(cross=>{
        ctx.beginPath()
        ctx.save()
            ctx.translate(cross.x,cross.y)
            ctx.moveTo(0,-10)
            ctx.lineTo(0,10)
            ctx.moveTo(-10,0)
            ctx.lineTo(10,0)
            ctx.lineWidth=2
            ctx.strokeStyle="white"
            ctx.stroke()
        ctx.restore()
    })
    //打字效果
    
    text.draw_text()
    if(text.finish){
        small_text.draw_text()
    }

    // ----------------
    setTimeout(draw,1000/30)
}
draw()


//滑鼠事件跟紀錄--------------
var mousePos = new Vec(0,0)
var mousePosDown = new Vec(0,0)
var mousePosUp = new Vec(0,0)

window.addEventListener("mousemove",mousemove)
window.addEventListener("mouseup",mouseup)
window.addEventListener("mousedown",mousedown)
function mousemove(evt){
    mousePos.set(evt.offsetX,evt.offsetY)
    // console.log(mousePos)
}
function mouseup(evt){
    mousePos.set(evt.offsetX,evt.offsetY)
    mousePosUp = mousePos.clone()
}
function mousedown(evt){
    mousePos.set(evt.offsetX,evt.offsetY)
    mousePosDown = mousePos.clone()
    
    circles.push(new Circle({
    p: mousePos.clone(),
    })) 
}
