import AlarmImage from './images/alarm.png'
import AppleImage from './images/apple.png'
import ClockImageBasic from './images/testuhr.png'
import ClockImage2A from './images/clock2a.png'
import ClockImage2B from './images/clock2b.png'
import ClockImage3 from './images/clock3.png'
import Sleeper3ImageUp from './images/sleeper3up.jpg'
import Sleeper4ImageUp from './images/sleeper4up.jpg'
import Sleeper5ImageUp from './images/sleeper5up.jpg'

export default class Preloader {

  percent = 0

  constructor(callback) {
      let assets=[
        AlarmImage,
        ClockImageBasic,
        ClockImage2A,
        ClockImage2B,
        ClockImage3,
        './audio/level1.mp3',
        './audio/ch_alooktothefuture.mp3'
      ]
      this.callback = callback
      this.e = document.getElementById("preloader")
      this.bar = document.getElementById("preloader_progress_bar")
      this.button = document.getElementById("pl_enter")
      this.button.disabled = true
      this.button.onclick = () => {
          this.e.style.display="none"
          this.callback()
      }
      this.preload(assets)
  }

  async preload(files) {
    for(let key in files) {
      let file = await fetch(files[key])
      this.percent=parseInt((key/(files.length-1))*100)
      this.bar.style.width = this.percent+"%"
    }
    this.button.disabled = false
  }

}
