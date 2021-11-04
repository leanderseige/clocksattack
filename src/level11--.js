import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper11ImageUp from './images/sleeper11up.jpg'
import BackgroundLevel11 from './images/level11_background.jpg'

export default class Level11 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel11})`

    // document.getElementById('sleeper').src = Sleeper11Image
    document.getElementById('sleeperawake').src = Sleeper11ImageUp
  }

}
