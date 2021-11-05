import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper13ImageUp from './images/sleeper13up.jpg'
import BackgroundLevel13 from './images/level13_background.jpg'

export default class Level13 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel13})`

    // document.getElementById('sleeper').src = Sleeper13Image
    document.getElementById('sleeperawake').src = Sleeper13ImageUp
  }

}
