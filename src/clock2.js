import Clock from './clock.js'
import ClockImage2A from './images/clock2a.png'
import ClockImage2B from './images/clock2b.png'

export default class Clock2 extends Clock {

  init() {
    this.lives = 2
    this.img.style.width = "15vh"
    this.img.src = ClockImage2A
    this.rand =  Math.floor(Math.random() * 8)
    this.randwidth = Math.random() * 10
    this.randwoff = 10 + Math.random() * 20
    this.randwstrt = Math.random() * 2 * Math.PI
    this.randshake = 2 + Math.random() / 4
    this.randshoff = Math.random() * 2 * Math.PI
    this.randspeed = Math.random() / 4
  }

  moveHorizontal() {
    this.left = "calc( ( 25vh - 15vh ) + "
      + (this.randwidth*(Math.sin(this.randwstrt+this.y/10)))
      + "vh )"
  }

  moveSwingAfterHit() {
    this.transform = "rotate("+ (25*Math.sin(this.randshoff+this.y/this.randshake)) +"deg)"
  }

  hitMorph() {
    let d = 10 + Math.random() * 55
    d = Math.random()>.5 ? d : -d
    this.transform = "rotate("+ d +"deg)"
    this.img.src = ClockImage2B
    this.moveSwing = this.moveSwingAfterHit
  }

}
