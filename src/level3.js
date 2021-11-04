import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper3ImageUp from './images/sleeper3up.jpg'
import BackgroundLevel3 from './images/level3_background.jpg'

export default class Level3 extends Level {

  configure() {
    this.music = new Audio('./audio/level2.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel3})`

    // document.getElementById('sleeper').src = Sleeper3Image
    document.getElementById('sleeperawake').src = Sleeper3ImageUp
  }

}
