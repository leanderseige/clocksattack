import AppleImage from './images/apple.png'

export default class PadController {

  constructor(gpnumber,clocks,player,globals) {
    this.globals = globals
    this.stop = false
    this.gpnumber = gpnumber
    this.player = player
    this.blocked = 0
    this.x = 50
    this.y = 50
    this.e = document.createElement("div")
    this.e.classList.add("crosshair")
    this.e.style.backgroundImage = `url(${AppleImage})`
    // this.e.innerHTML='&#65291;' //  this.player
    document.getElementById('mainframe').appendChild(this.e)
    this.loop()
    console.log("created: controler %s| player %s",this.gpnumber,this.player)
    let ngg = navigator.getGamepads()
    let gp = ngg[this.gpnumber]
    // console.log(gp)
  }

  buttonPressed(b) {
    if (typeof(b) == "object") {
      return b.pressed;
    }
    return b == 1.0;
  }

  loop() {
    let ngg = navigator.getGamepads()
    let gp = ngg[this.gpnumber]
    // console.log(gp)

    if (this.buttonPressed(gp.buttons[14])) {
      this.x -= .25
    } else if (this.buttonPressed(gp.buttons[12])) {
      this.y -= .25
    }

    if (this.buttonPressed(gp.buttons[13])) {
      this.y += .25
    } else if (this.buttonPressed(gp.buttons[15])) {
      this.x += .25
    }

    this.x = this.x>200?200:this.x
    this.y = this.y>100?100:this.y
    this.x = this.x<0?0:this.x
    this.y = this.y<0?0:this.y

    if (
      this.buttonPressed(gp.buttons[0]) ||
      this.buttonPressed(gp.buttons[1])
    ) {
      if(this.blocked<Date.now()) {
        this.checkClocks()
        this.blocked = Date.now()+500
      }
    }

    if(this.buttonPressed(gp.buttons[9])) {
      this.globals.startGame()
    }

    if(gp.axes && gp.axes.length>1) {
      this.x += Math.round(2*gp.axes[0])
      this.y += Math.round(2*gp.axes[1])
    }

    this.e.style.left = this.x+"vh"
    this.e.style.top = this.y+"vh"
    if(this.stop===false) {
      setTimeout(() => {this.loop()},20)
    }
  }

  getPixelCoords() {
    let r = this.e.getBoundingClientRect()
    return({
      x: r.left+(r.right-r.left)/2,
      y: r.top+(r.bottom-r.top)/2
    })
  }

  checkClocks() {
    let p = this.getPixelCoords()
    console.log("CLICK")
    console.log(this.globals)
    let clocks = this.globals.getCurrentClocks()
    let ngg = navigator.getGamepads()
    let gp = ngg[this.gpnumber]
    for(let key in clocks) {
      if(clocks[key].checkHit(p.x,p.y,this.player)) {
        console.log("HIT")
        if(gp.vibrationActuator) {
          gp.vibrationActuator.playEffect("dual-rumble", {
              startDelay: 500,
              duration: 200,
              weakMagnitude: 1.0,
              strongMagnitude: 1.0
          })
        }
        break
      }
    }
  }

  remove() {
    console.log("removed: controler %s | player %d",this.gpnumber,this.player)
    console.log(this)
    this.stop = true
    this.e.remove()
  }


}
