import DebrisImg1 from './images/debris1.png'
import DebrisImg2 from './images/debris2.png'
import DebrisImg3 from './images/debris3.png'
import DebrisImg4 from './images/debris4.png'
import DebrisImg5 from './images/debris5.png'
import DebrisImg6 from './images/debris6.png'
import DebrisImg7 from './images/debris7.png'

export default class Debris {

  constructor(top,left) {
    this.frame = document.getElementById('level_background')
    this.objects = [
      DebrisImg1,
      DebrisImg2,
      DebrisImg3,
      DebrisImg4,
      DebrisImg5,
      DebrisImg6,
      DebrisImg7
    ]
    this.divs = []
    this.images = []
    for(let key in this.objects) {
      this.images[key] = document.createElement('img')
      this.images[key].src = this.objects[key]
      this.images[key].classList.add('debrisimg')

      this.divs[key] = document.createElement('div')
      this.divs[key].classList.add('debrisdiv')
      this.divs[key].style.transform = "rotate("+Math.floor(Math.random() * 360)+"deg)"
      this.divs[key].style.top = top
      this.divs[key].style.left = left

      document.body.appendChild(this.divs[key])
      // this.frame.appendChild(this.divs[key])
      this.divs[key].appendChild(this.images[key])
    }
    setTimeout(() => {
      for(let key in this.objects) {
        this.divs[key].removeChild(this.images[key])
        document.body.removeChild(this.divs[key])
        // this.frame.removeChild(this.divs[key])
      }
    },2000)
  }

}
