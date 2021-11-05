import Logo from './logo.js'
import Preloader from './preloader.js'
import MainMenu from './mainmenu.js'
import GameOver from './gameover.js'
import NextLevel from './nextlevel.js'
import Level1 from './level1.js'
// import Level2 from './level2.js'
import Level3 from './level3.js'
import Level4 from './level4.js'
import Level5 from './level5.js'
import Level6 from './level6.js'
// import Level7 from './level7.js'
import Level8 from './level8.js'
import Level9 from './level9.js'
import Level10 from './level10.js'
// import Level11 from './level11.js'
import Level12 from './level12.js'
// import Level13 from './level13.js'
import './css/main.css'
import './css/level_elements.css'
import './css/ingame_display.css'
import './css/main_menu.css'
import './css/menu_background.css'
import './css/mobile.css'
import './css/weapons.css'
import './css/gameover.css'
import './css/nextlevel.css'

let mainmenu = false
let preloader = false
let levels = {}
let score  = [0,0,0]

let globals = {
  current_level: 1,
  volume: 1,
  volume_fx: .8,
  gameover: null,
  nextlevel: null,
  logo: null,
  maxlevel: 0,
  clocks: {},
  getCurrentClocks: () => { return getCurrentClocks() }
}

function getCurrentClocks() {
  return levels[globals.current_level].clocks
}

function endGame(success) {
  console.log("endGame "+success+" "+globals.current_level)
  globals.current_level++
  while(levels[globals.current_level]===undefined && globals.current_level<=globals.maxlevel) {
    globals.current_level++
  }
  if(success && globals.current_level<=globals.maxlevel) {
    startGame()
  } else {
    globals.current_level = 1
    globals.logo.unhide()
    mainmenu.unhide()
  }
}

function updateDisplay(scoreplus,player) {
  score[parseInt(player)] += scoreplus
  document.getElementById('scoreleft').innerHTML=score[2]
  document.getElementById('scoreright').innerHTML=score[1]
}

function startGame() {
  mainmenu.hide()
  globals.logo.hide()
  levels[globals.current_level].start()
  globals.clocks = levels[globals.current_level].clocks
}

function enterMenu() {
  // globals.logo.unhide()
  mainmenu = new MainMenu(globals, () => { startGame() }, globals.clocks)
  mainmenu.unhide()
}

// Here we go!

console.log("Clocks Attack!!!")

window.onload = () => {
  globals.logo = new Logo()
  globals.gameover = new GameOver()
  globals.nextlevel = new NextLevel()
  levels[1] = new Level1( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  // levels[2] = new Level2( globals,
  //   (player,scoreplus) => { updateDisplay(player,scoreplus) },
  //   (success) => { endGame(success) }
  // )
  levels[3] = new Level3( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  levels[4] = new Level4( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  levels[5] = new Level5( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  levels[6] = new Level6( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  // levels[7] = new Level7( globals,
  //   (player,scoreplus) => { updateDisplay(player,scoreplus) },
  //   (success) => { endGame(success) }
  // )
  levels[8] = new Level8( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  levels[9] = new Level9( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  levels[10] = new Level10( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  // levels[11] = new Level11( globals,
  //   (player,scoreplus) => { updateDisplay(player,scoreplus) },
  //   (success) => { endGame(success) }
  // )
  levels[12] = new Level12( globals,
    (player,scoreplus) => { updateDisplay(player,scoreplus) },
    (success) => { endGame(success) }
  )
  // levels[13] = new Level13( globals,
  //   (player,scoreplus) => { updateDisplay(player,scoreplus) },
  //   (success) => { endGame(success) }
  // )
  globals.maxlevel = 13
  globals.current_level=1
  preloader = new Preloader(() => { enterMenu() })
  preloader.preload()
}
