import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper6ImageUp from './images/sleeper6up.jpg'
import BackgroundLevel6 from './images/level6_background.jpg'

export default class Level6 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel6})`

    // document.getElementById('sleeper').src = Sleeper6Image
    document.getElementById('sleeperawake').src = Sleeper6ImageUp
  }

}
