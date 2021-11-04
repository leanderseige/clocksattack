import AlarmImage from './images/alarm.png'
import Settings from './settings.js'

export default class MainMenu {

  constructor(globals, callback, clocks) {
    this.globals = globals
    this.stop = true

    this.callback = callback

    this.settings = new Settings(globals)
    this.e = document.getElementById("mainmenu")
    this.bg = document.getElementById("menu_background")

    this.audio = new Audio('./audio/ch_alooktothefuture.mp3')
    console.log({v:this.globals.volume})
    this.audio.volume = this.globals.volume
    this.audio.loop = true
    this.audioctx =  false
    this.audiogainnode = false
    this.audiotrack = false
    this.audio.addEventListener('play', () => {
      this.audioctx = new AudioContext()
      this.audiotrack = this.audioctx.createMediaElementSource(this.audio)
      this.audiogainnode = this.audioctx.createGain()
      this.audiotrack.connect(this.audiogainnode)
      this.audiogainnode.connect(this.audioctx.destination)
      this.audiogainnode.gain.value = 0
    })

    this.animate()

    this.mb_start = document.getElementById("mb_start")
    this.mb_start.onclick = this.callback
    this.mb_start.style.zIndex = 750
    this.mb_settings = document.getElementById("mb_settings")
    this.mb_settings.onclick = () => {this.openSettings()}
    this.mb_settings.style.zIndex = 750

    // this.unhide()
  }

  openSettings() {
    this.settings.unhide()
  }

  init() {
  }

  animate() {
    if(this.audiogainnode) {
      // console.log(this.audiogainnode.gain.value)
      if(this.stop===false) {
          if(this.audiogainnode.gain.value<1) {
              this.audiogainnode.gain.value = (this.audiogainnode.gain.value+0.01>1) ? 1 : this.audiogainnode.gain.value+0.01
          }
          // if(this.audio.volume<1) {
          //     this.audio.volume= (this.audio.volume+0.01>1) ? 1 : this.audio.volume+0.01
          // }
      } else {
          if(this.audiogainnode.gain.value>0) {
              this.audiogainnode.gain.value = (this.audiogainnode.gain.value-0.01<0) ? 0 : this.audiogainnode.gain.value-0.01
          // if(this.audio.volume>0) {
          //     this.audio.volume= (this.audio.volume-0.01<0) ? 0 : this.audio.volume-0.01
          } else {
              this.audio.pause()
              return // stop animate loop
          }
      }
    }
    setTimeout(() => {this.animate()},50)
  }

  hide() {
    this.e.style.display="none"
    this.bg.style.display="none"
    this.stop = true
  }

  unhide() {
    console.log("mainmenu unhide")
    this.audio.play()
    this.e.style.display="block"
    this.bg.style.display="block"
    this.stop = false
    this.animate() // restart animate loop
  }

  remove() {
  }

}
