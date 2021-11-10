import AlarmImage from './images/alarm.png'
import AppleImage from './images/apple.png'
import ClockImageBasic from './images/testuhr.png'
import ClockImage2A from './images/clock2a.png'
import ClockImage2B from './images/clock2b.png'
import ClockImage3 from './images/clock3.png'
import Sleeper1ImageUp from './images/sleeper1up.jpg'
import Sleeper3ImageUp from './images/sleeper3up.jpg'
import Sleeper4ImageUp from './images/sleeper4up.jpg'
import Sleeper5ImageUp from './images/sleeper5up.jpg'
import Sleeper6ImageUp from './images/sleeper3up.jpg'
import Sleeper8ImageUp from './images/sleeper4up.jpg'
import Sleeper9ImageUp from './images/sleeper5up.jpg'
import Sleeper10ImageUp from './images/sleeper3up.jpg'
import Sleeper12ImageUp from './images/sleeper4up.jpg'
import BackgroundLevel1 from './images/level1_background.jpg'
import BackgroundLevel3 from './images/level3_background.jpg'
import BackgroundLevel4 from './images/level4_background.jpg'
import BackgroundLevel5 from './images/level5_background.jpg'
import BackgroundLevel6 from './images/level6_background.jpg'
import BackgroundLevel8 from './images/level8_background.jpg'
import BackgroundLevel9 from './images/level9_background.jpg'
import BackgroundLevel10 from './images/level10_background.jpg'
import BackgroundLevel12 from './images/level12_background.jpg'
import DebrisImg1 from './images/debris1.png'
import DebrisImg2 from './images/debris2.png'
import DebrisImg3 from './images/debris3.png'
import DebrisImg4 from './images/debris4.png'
import DebrisImg5 from './images/debris5.png'
import DebrisImg6 from './images/debris6.png'
import DebrisImg7 from './images/debris7.png'


export default class Preloader {

  constructor(callback) {
      let assets=[
        Sleeper1ImageUp,
        Sleeper3ImageUp,
        Sleeper4ImageUp,
        Sleeper5ImageUp,
        Sleeper6ImageUp,
        Sleeper8ImageUp,
        Sleeper9ImageUp,
        Sleeper10ImageUp,
        Sleeper12ImageUp,
        BackgroundLevel1,
        BackgroundLevel3,
        BackgroundLevel4,
        BackgroundLevel5,
        BackgroundLevel6,
        BackgroundLevel8,
        BackgroundLevel9,
        BackgroundLevel10,
        BackgroundLevel12,
        AlarmImage,
        ClockImageBasic,
        ClockImage2A,
        ClockImage2B,
        ClockImage3,
        DebrisImg1,
        DebrisImg2,
        DebrisImg3,
        DebrisImg4,
        DebrisImg5,
        DebrisImg6,
        DebrisImg7,
        './audio/level1.mp3',
        './audio/level2.mp3',
        './audio/level3.mp3',
        './audio/ch_alooktothefuture.mp3'
      ]
      this.e = document.getElementById('preloader')
      this.bar = document.getElementById('preloader_progress_bar')
      this.button = document.getElementById('pl_enter')
      this.button.disabled = true
      this.button.onclick = () => { this.exit() }
      this.percent = 0
      this.blobs = {}
      this.callback = callback
      this.preload(assets)
  }

  async preload(files) {
    for(let key in files) {
      this.blobs[key] = await fetch(files[key])
      this.percent=parseInt((key/(files.length-1))*100)
      this.bar.style.width = this.percent+"%"
    }
    this.button.disabled=false
    // this.exit()
  }

  exit() {
    if(this.percent<100)  {
      console.log("NO "+this.percent)
      setTimeout( () => { this.exit() }, 1000)
    } else {
      console.log("YES")
      this.callback()
      this.e.style.display="none"
    }
  }

}
