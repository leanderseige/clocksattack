export default class PadController {

  constructor(gpnumber,clocks,player) {
    this.stop = false
    this.gpnumber = gpnumber
    this.clocks = clocks
    this.player = player
    this.blocked = 0
    this.x = 100
    this.y = 100
    this.e = document.createElement("div")
    this.e.classList.add("crosshair")
    this.e.innerHTML=this.player
    document.getElementById('mainframe').appendChild(this.e)
    this.loop()
    console.log("created: controler %s| player %s",this.gpnumber,this.player)
    let ngg = navigator.getGamepads()
    let gp = ngg[this.gpnumber]
    console.log(gp)
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
    console.log(gp)

    if (this.buttonPressed(gp.buttons[14])) {
      this.x -= 10
    } else if (this.buttonPressed(gp.buttons[12])) {
      this.y -= 10
    }

    if (this.buttonPressed(gp.buttons[13])) {
      this.y += 10
    } else if (this.buttonPressed(gp.buttons[15])) {
      this.x += 10
    }

    if (
      this.buttonPressed(gp.buttons[0]) ||
      this.buttonPressed(gp.buttons[1])
    ) {
      if(this.blocked<Date.now()) {
        this.checkClocks()
        this.blocked = Date.now()+500
      }
    }

    if(gp.axes && gp.axes.length>1) {
      this.x += Math.round(3*gp.axes[0])*4
      this.y += Math.round(3*gp.axes[1])*4
    }

    this.e.style.left = this.x+"px"
    this.e.style.top = this.y+"px"
    if(this.stop===false) {
      setTimeout(() => {this.loop()},50)
    }
  }

  checkClocks() {
    let ngg = navigator.getGamepads()
    let gp = ngg[this.gpnumber]
    console.log("CLICK")
    console.log(this.clocks)
    for(let key in this.clocks) {
      if(this.clocks[key].checkHit(this.x,this.y,this.player)) {
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
