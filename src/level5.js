import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper5ImageUp from './images/sleeper5up.jpg'
import BackgroundLevel5 from './images/level5_background.jpg'

export default class Level5 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel5})`

    // document.getElementById('sleeper').src = Sleeper5Image
    document.getElementById('sleeperawake').src = Sleeper5ImageUp
  }

}
