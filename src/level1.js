import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Level from './level.js'
import Sleeper1ImageUp from './images/sleeper1up.jpg'
import BackgroundLevel1 from './images/level1_background.jpg'

export default class Level1 extends Level {

  configure() {
    this.music = new Audio('./audio/level1.mp3')
    this.music.pause()
    this.music.volume = this.globals.volume
    this.music.loop = true

    document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel1})`

    // document.getElementById('sleeper').src = DogImage
    document.getElementById('sleeperawake').src = Sleeper1ImageUp
  }

}
