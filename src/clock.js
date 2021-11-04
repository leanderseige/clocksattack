import ClockImageBasic from './images/testuhr.png'
import Debris from './debris.js'

export default class Clock {

  constructor(globals, id,callback) {
    this.globals = globals
    // basics
    this.status = "ALIVE"
    this.id = id
    this.callback = callback
    this.lives = 1
    // html elements
    this.frame = document.getElementById('level_background')
    this.img = document.createElement('img')
    this.img.src = ClockImageBasic
    this.img.className = "clocks"
    this.img.setAttribute('draggable', false)
    this.img.style.top = this.top+"vh"
    this.img.style.width =  "10vh"
    this.img.onclick = () => { this.hit(1) }
    this.frame.appendChild(this.img)
    // audio
    this.audio1 = new Audio('./audio/crash1.mp3')
    this.audio1.currentTime=0
    this.audio1.volume = 1 * this.globals.volume_fx
    this.audio2 = new Audio('./audio/crash2.mp3')
    this.audio2.currentTime=0
    this.audio2.volume = 1 * this.globals.volume_fx
    this.audio3 = new Audio('./audio/boing.mp3')
    this.audio3.currentTime=0
    this.audio3.volume = .75 * this.globals.volume_fx
    // movement
    this.y = -20
    this.top = ""
    this.left = ""
    this.transform = ""
    // custom init
    this.init()
    // go!
    this.animate()
  }

  init() {
    this.lives = 1
    this.img.src = ClockImageBasic
    this.rand =  Math.floor(Math.random() * 8)
    this.randwidth = Math.random() * 12.5
    this.randwoff = 12.5 + Math.random() * 25
    this.randwstrt = Math.random() * 2 * Math.PI
    this.randshake = 2 + Math.random() * 4
    this.randshoff = Math.random() * 2 * Math.PI
    this.randspeed = Math.random() / 4
  }

  animate() {
    if(this.status==="DEAD") {
      return
    }
    this.moveVertical()
    this.moveHorizontal()
    this.moveSwing()
    this.img.style.top=this.top
    this.img.style.left=this.left
    this.img.style.transform=this.transform
    let crec = this.img.getBoundingClientRect()
    let srec = document.getElementById("sleeperawake").getBoundingClientRect()
    if(crec.bottom>(srec.top+50)) {
      console.log("Wake dog!")
      this.callback(this.id,'WAKEDOG',0)
    }
    setTimeout(() => {this.animate()},50)
  }

  moveVertical() {
    this.y += .5+this.randspeed
    this.top = this.y+"vh"
  }

  moveHorizontal() {
    this.left = "calc( 50vw - " + this.img.style.width + "px / 2 )"
  }

  moveSwing() {
    // nothing
  }

  hitSound() {
    this.audio1.currentTime=0
    this.audio1.play()
    let rnd = Math.random()
    if(rnd>0.8) {
      this.audio3.currentTime=0
      this.audio3.play()
    } else if(rnd>0.6) {
      console.log("Boing!")
      this.audio2.currentTime=0
      this.audio2.play()
    }
  }

  hitMorph() {
    // nothing
  }

  hitEffect() {
    this.hitSound()
    this.hitMorph()
  }

  checkHit(x,y,player) {
    let rec = this.img.getBoundingClientRect()
    console.log(rec)
    console.log("%d %d",x,y)
    if( rec.top<y && rec.bottom>y && rec.left<x && rec.right>x ) {
      this.hit(player)
      return true
    }
    return false
  }

  hit(player) {
    this.lives--
    if(this.lives===0) {
      // throw deadly apple
      this.callback(this.id,"DESTROYCLOCK",player)
      // wait for the apple to hit
      setTimeout(() => {
        this.remove()
      },500)
    } else {
      // throw apple
      this.callback(this.id,"HITCLOCK",player)
    }
    // wait for the apple to hit the clock
    setTimeout(() => {
      this.hitEffect()
    },500)
  }

  getCenterOfImage(i) {
    let bcr = i.getBoundingClientRect()
    let cx = bcr.x + bcr.width/2
    let cy = bcr.y + bcr.height/2
    return {x:cx,y:cy}
  }

  dieEffect() {
    let r = this.getCenterOfImage(this.img)
    let deb = new Debris(r.y+"px",r.x+"px")
    setTimeout(() => {
      deb = null
    },3000)
  }

  remove() {
    this.dieEffect()
    this.status="DEAD"
    this.frame.removeChild(this.img)
  }

}
