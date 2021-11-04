import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper10ImageUp from './images/sleeper10up.jpg'
import BackgroundLevel10 from './images/level10_background.jpg'

export default class Level10 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel10})`

    // document.getElementById('sleeper').src = Sleeper10Image
    document.getElementById('sleeperawake').src = Sleeper10ImageUp
  }

}
