import Clock from './clock.js'

export default class Clock1 extends Clock {


  moveHorizontal() {
    // this.left = "calc( (100vw - 50vh) / 2 + "
    this.left = "calc( ( 25vh - 5vh ) + "
      + (this.randwidth*(Math.sin(this.randwstrt+this.y/10)))
      + "vh )"
  }

  moveSwing() {
    this.transform = "rotate("+ (25*Math.sin(this.randshoff+this.y/this.randshake)) +"deg)"
  }

}
