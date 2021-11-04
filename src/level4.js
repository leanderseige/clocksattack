import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper4ImageUp from './images/sleeper4up.jpg'
import BackgroundLevel4 from './images/level4_background.jpg'

export default class Level4 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel4})`

    // document.getElementById('sleeper').src = Sleeper4Image
    document.getElementById('sleeperawake').src = Sleeper4ImageUp
  }

}
