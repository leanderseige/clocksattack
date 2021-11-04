import PadController from './padcontroller.js'

export default class Settings {

  constructor(clocks) {
    this.clocks=clocks
    this.gp1 = false
    this.gp2 = false
    this.players = 1
    this.mode = "mouse"
    this.e = document.getElementById("settings")
    this.e.style.display="none"
    this.sb_mouse = document.getElementById('sb_mouse')
    this.sb_touch = document.getElementById('sb_touch')
    this.sb_onegp = document.getElementById('sb_onegp')
    this.sb_twogp = document.getElementById('sb_twogp')
    this.sb_launch = document.getElementById('sb_launch')
    this.sb_launch.onclick = () => {this.hide()}
    this.gamepads = []
    this.checkGamepads()
    window.addEventListener("gamepadconnected",(e) => {this.checkGamepads(e)})
    window.addEventListener("gamepaddisconnected",(e) => {this.checkGamepads(e)})
  }

  checkGamepads(e) {
    console.log("checkGPs controler")
    console.log(this)

    if(this.gp1!==false) {
      this.gp1.remove()
      delete this.gp1
      this.gp1 = false
    }
    this.sb_onegp.disabled=true

    if(this.gp2!==false) {
      this.gp2.remove()
      delete this.gp2
      this.gp2 = false
    }
    this.sb_twogp.disabled=true

    if(!navigator.getGamepads) {
      console.log(navigator)
      console.log("No Gamepad API!")
      return
    }

    let ngg = navigator.getGamepads()
    console.log(ngg)
    if(typeof ngg !== 'object') {
        return
    }

    this.gamepads = []
    for(let key in [0,1,2,3]) {
      if(typeof ngg[key] === 'object' && ngg[key]!==null) {
        this.gamepads.push(key)
      }
    }
    console.log(this.gamepads)
    if(this.gamepads.length>1) {
      this.sb_twogp.disabled=false
      console.log("c1")
      this.gp2 = new PadController(this.gamepads[1],this.clocks,2)
    }

    if(this.gamepads.length>0) {
      this.sb_onegp.disabled=false
      console.log("c2")
      this.gp1 = new PadController(this.gamepads[0],this.clocks,1)
    }

  }

  init() {
  }

  animate() {
  }

  hide() {
    this.e.style.display="none"
  }

  unhide() {
    this.e.style.display="block"
  }

  remove() {
  }

}
