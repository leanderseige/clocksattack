import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper12ImageUp from './images/sleeper12up.jpg'
import BackgroundLevel12 from './images/level12_background.jpg'

export default class Level12 extends Level {

  configure() {
    this.music = new Audio('./audio/level2.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel12})`

    // document.getElementById('sleeper').src = Sleeper12Image
    document.getElementById('sleeperawake').src = Sleeper12ImageUp
  }

}
