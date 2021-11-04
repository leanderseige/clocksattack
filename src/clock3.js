import Clock from './clock.js'
import ClockImage3 from './images/clock3.png'

export default class Clock3 extends Clock {

  init() {
    this.lives = 5
    this.img.style.width = "30vh"
    this.img.src = ClockImage3
    this.rand =  Math.floor(Math.random() * 8)
    this.randwidth = Math.random() * 10
    this.randwoff = 10 + Math.random() * 20
    this.randwstrt = Math.random() * 2 * Math.PI
    this.randshake = 2 + Math.random() * 4
    this.randshoff = Math.random() * 2 * Math.PI
    this.randspeed = Math.random() / 4
    this.left = "calc( 50vw - " + this.img.style.width + "/2 )"
    this.callback(this.id,'ADDBOSS')
    this.offsetTarget=false
    this.offsetCount=0
    this.y = -60
  }

  moveVertical() {
    this.y += .2
    this.top = this.y+"vh "
  }

  moveHorizontal() {
    if(this.offsetCount>0) {
      let rec = this.img.getBoundingClientRect()
      this.left = "calc( " + rec.left + "px + "+ this.offsetTarget + "/" + this.offsetCount + " )"
      this.offsetCount--
    }
  }

  hitMorph() {
    if(Math.random()>.5) {
      this.offsetTarget="1vh"
    } else {
      this.offsetTarget="-1vh"
    }
    this.offsetCount=10
    // this.left = "calc( 50vw - " + this.img.style.width + "/2 + "
    //   + (5-this.lives) * ((-1.0) ** this.lives) * 3 + "vh )"
  }

  dieEffect() {
    this.callback(this.id,'REMOVEBOSS')
  }

}
