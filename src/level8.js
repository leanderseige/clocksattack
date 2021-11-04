import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper8ImageUp from './images/sleeper8up.jpg'
import BackgroundLevel8 from './images/level8_background.jpg'

export default class Level8 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel8})`

    // document.getElementById('sleeper').src = Sleeper8Image
    document.getElementById('sleeperawake').src = Sleeper8ImageUp
  }

}
