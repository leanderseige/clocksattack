import Clock1 from './clock1.js'
import Clock2 from './clock2.js'
import Clock3 from './clock3.js'
import Sleeper1ImageUp from './images/sleeper1up.jpg'
import BackgroundLevel1 from './images/level1_background.jpg'
import AlarmImage from './images/alarm.png'
import AppleImage from './images/apple.png'

export default class Level {

  constructor(globals, callbackUpdateDisplay, callbackEndGame) {
    this.globals = globals
    this.callbackUpdateDisplay = callbackUpdateDisplay
    this.callbackEndGame = callbackEndGame
    this.clocks = {}
    this.clockid = 0
    this.e = document.getElementById("mainframe")
    this.music = false
    this.state = 'OFF' // 'RUNNING' or 'ALARM' or 'END'
    this.start_time = 0
    this.boss = false
    this.spawnrate = 3000
    this.alarm_audio = new Audio('./audio/alarm.mp3')
    this.alarm_audio.pause()
    this.alarm_audio.volume = this.globals.volume_fx
    this.init()
    // this.stop()
  }

  init() {
  }

  animate() {
    this.time = Date.now()-this.start_time
    console.log("clocks: "+Object.keys(this.clocks).length)
    switch(this.state)  {
      case 'RUNNING':
        this.animate_clocks()
        break
      case 'ALARM':
        break
    }
    if(this.state==='RUNNING' || this.state==='ALARM' || this.state==='END') {
      setTimeout(() => {this.animate()},this.spawnrate)
    }
  }

  start() {
    this.configure()
    console.log("Start")
    document.getElementById('level_background').style.opacity="1"
    // document.getElementById('sleeper').style.opacity="1"
    document.getElementById('sleeperawake').style.opacity="0"
    this.globals.nextlevel.show(this.globals.current_level)
    this.music.play()
    this.start_time = Date.now()
    this.state = 'RUNNING'
    this.animate()
  }

  alarm(id) {
    this.globals.gameover.show()
    this.state = 'ALARM'
    // document.getElementById('sleeper').style.opacity="0"
    document.getElementById('sleeperawake').style.opacity="1"
    // alarm sound
    this.alarm_audio.currentTime=1
    this.alarm_audio.play()
    this.music.pause()
    // alarm clock
    let r = this.getCenterOfImage(this.clocks[id].img)
    let img = document.createElement('img')
    img.style.top = r.y+"px"
    img.style.left = r.x+"px"
    img.src = AlarmImage
    document.getElementById('mainframe').appendChild(img)
    img.className = "alarms"
    // come back after animation
    document.getElementById('level_background').classList.add("shake")
    this.finish(img)
  }

  success(id) {
    this.music.pause()
    this.state = 'END'
    let elem = document.createElement('div')
    document.getElementById('mainframe').appendChild(elem)
    elem.className = "fadeinout"
    this.finish(elem)
  }

  finish(element) {
    setTimeout(() => {
        document.getElementById('level_background').classList.remove("shake")
        // turn off alarm
        this.alarm_audio.pause()
        document.getElementById('mainframe').removeChild(element)
        // reset game
        for(let key in this.clocks) {
          this.clocks[key].remove()
          delete this.clocks[key]
        }
        this.stop()
    },3000)
    // clean up
    for(let key in this.clocks) {
      this.clocks[key].remove()
      delete this.clocks[key]
    }
  }

  stop() {
    document.getElementById('level_background').style.opacity="0"
    // document.getElementById('sleeper').style.opacity="0"
    document.getElementById('sleeperawake').style.opacity="0"
    let success = (this.state==='END')
    console.log({success:success})
    this.callbackEndGame(success)
    this.state = "OFF"
  }

  remove() {
  }

  clockManager(id,action,player) {

    switch(action) {

      case 'WAKEDOG':
        // raise dog's head
        this.alarm(id)
        setTimeout(()=>{
          // document.getElementById('sleeper').style.opacity="0"
          document.getElementById('sleeperawake').style.opacity="1"
          setTimeout(()=>{
            // document.getElementById('sleeper').style.opacity="1"
            document.getElementById('sleeperawake').style.opacity="0"
          },6000)
        },500)
        break

      case 'DESTROYCLOCK':
        this.throwWeapon(id,player)
        delete this.clocks[id]
        break

      case 'HITCLOCK':
        this.throwWeapon(id,player)
        break

      case "ADDBOSS":
        this.boss=true
        break

      case 'REMOVEBOSS':
        this.boss=false
        break

      default:
        break
    }
  }

  getCenterOfImage(i) {
    let bcr = i.getBoundingClientRect()
    let cx = bcr.x + bcr.width/2
    let cy = bcr.y + bcr.height/2
    return {x:cx,y:cy}
  }

  throwWeapon(id,player) {
    console.log("TW!!!")
    let r = this.getCenterOfImage(this.clocks[id].img)
    let img = document.createElement('img')
    img.className = "apples"
    img.style.top = r.y+"px"
    img.style.left = r.x+"px"
    img.src = AppleImage
    document.getElementById('mainframe').appendChild(img)
    setTimeout(() => {
      document.getElementById('mainframe').removeChild(img)
      this.callbackUpdateDisplay(100,player)
      // updateDisplay()
    },500)
  }

// the followin functions are ment to be overwritten //////////////////////////
configure() {
  this.music = new Audio('./audio/level1.mp3')
  this.music.pause()
  this.music.volume = this.globals.volume
  this.music.loop = true

  document.getElementById('level_background').style.backgroundImage = `url(${BackgroundLevel1})`

  // document.getElementById('sleeper').src = DogImage
  document.getElementById('sleeperawake').src = Sleeper1ImageUp
}

  animate_clocks() {
    if(this.time>12000) {
      if(Object.keys(this.clocks).length===0)  {
        this.success()
      }
    } else if(this.time>9000) {
      if(Math.random()>.8 && this.boss===false) {
        // this.clocks[++this.clockid]=new Clock3(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
      } else if(Math.random()>.4) {
        this.clocks[++this.clockid]=new Clock2(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
      } else {
        this.clocks[++this.clockid]=new Clock1(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
      }
    } else if(this.time>7000) {
      if(Math.random()>.5) {
        this.clocks[++this.clockid]=new Clock2(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
      } else {
        this.clocks[++this.clockid]=new Clock1(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
      }
    } else if(this.time>5000) {
      this.clocks[++this.clockid]=new Clock2(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
    } else if(this.time>3000) {
      this.clocks[++this.clockid]=new Clock1(this.globals, this.clockid, (id,action,player) => { this.clockManager(id,action,player) } )
    } else {}
  }

}
