import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper9ImageUp from './images/sleeper9up.jpg'
import BackgroundLevel9 from './images/level9_background.jpg'

export default class Level9 extends Level {

  configure() {
    this.music = new Audio('./audio/level2.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel9})`

    // document.getElementById('sleeper').src = Sleeper9Image
    document.getElementById('sleeperawake').src = Sleeper9ImageUp
  }

}
