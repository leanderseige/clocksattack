import LogoClocks from './images/logo-clocks.svg'
import LogoAttack from './images/logo-attack.svg'

export default class Logo {

  constructor() {
    this.frame = document.getElementById('mainframe')
    this.imgc = document.createElement('img')
    this.imgc.src = LogoClocks
    this.imgc.setAttribute('draggable', false)
    this.imgc.style.position = "absolute"
    this.imgc.style.top = "5vh"
    // this.imgc.style.transformOrigin = "50% 300%"
    this.imgc.style.left = "calc( 50vw - 12.5vh )"
    this.imgc.style.width =  "24vh"
    this.imgc.style.zIndex =  "1000"
    this.imgc.style.userSelect =  "none"
    this.imgc.style.pointerEvents =  "none"
    this.imga = document.createElement('img')
    this.imga.src = LogoAttack
    this.imga.setAttribute('draggable', false)
    this.imga.style.position = "absolute"
    this.imga.style.top = "15vh"
    // this.imga.style.transformOrigin = "50% 300%"
    this.imga.style.left = "calc( 50vw - 15vh )"
    this.imga.style.width =  "28vh"
    this.imga.style.zIndex =  "1010"
    this.imga.style.userSelect =  "none"
    this.imga.style.pointerEvents =  "none"
    // pass through events
    this.imgc.style.pointerEvents = "none"
    this.imga.style.pointerEvents = "none"
    this.frame.appendChild(this.imgc)
    this.frame.appendChild(this.imga)
    this.startAnimation(40,0,-1,"block","block")
  }

  init() {
  }

  startAnimation(start,end,step,startdisplay,enddisplay) {
    this.animstep = step
    this.animstart = start
    this.animnow = start
    this.animend = end
    this.animabs = Math.abs(start-end)
    this.animenddisplay = enddisplay
    this.imgc.style.display = startdisplay
    this.imga.style.display = startdisplay
    this.animate()
  }

  animate() {
    let rotc = -2 + (this.animnow/this.animabs) * 35 * Math.sin(2 * Math.PI * this.animnow/10)
    let rota = +2 + (this.animnow/this.animabs) * 25 * Math.cos(2 * Math.PI * this.animnow/10)
    let scalec = this.animnow/this.animabs + 1.5
    let scalea = this.animnow/this.animabs + 1.5
    this.imgc.style.transform = " scale(" + scalec + ") " + " translate(0%,300%) rotate(" + rotc + "deg) translate(0%,-300%)"
    this.imga.style.transform = " scale(" + scalea + ") " + " translate(0%,500%) rotate(" + rota + "deg) translate(0%,-500%)"
    this.imgc.style.opacity = 1 // -(this.animnow/this.animabs)
    this.imga.style.opacity = 1 // -(this.animnow/this.animabs)
    if( (this.animstep>0 && this.animnow<=this.animend)
        || (this.animstep<0 && this.animnow>=this.animend)
    ) {
        setTimeout(() => {this.animate()},40)
    } else {
        this.imgc.style.display = this.animenddisplay
        this.imga.style.display = this.animenddisplay
    }
    this.animnow += this.animstep
  }

  hide() {
    this.startAnimation(0,40,1,"block","none")
  }

  unhide() {
      this.startAnimation(40,0,-1,"block","block")
  }

  remove() {
  }

}
