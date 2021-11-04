export default class GameOver {

  constructor(globals) {
    this.globals = globals
    this.frame = document.getElementById('level_background')
    this.text = [ ['G','A','M','E'], ['O','V','E','R'] ]
    this.elements = [[],[]]
    for(let y in this.text) {
      for(let x in this.text[y]) {
        this.elements[y][x]=document.createElement('div')
        this.elements[y][x].className='gameover'
        this.elements[y][x].style.display = 'none'
        this.elements[y][x].style.top = (7.5+y*10)+"vh"
        this.elements[y][x].style.left = (7.5+x*10)+"vh"
        this.elements[y][x].style.animationDuration = 500+Math.random()*500
        this.elements[y][x].innerHTML = this.text[y][x]
        this.frame.appendChild(this.elements[y][x])
      }
    }
  }

  show() {
    for(let y in this.elements) {
      for(let x in this.elements[y]) {
        setTimeout(() => { this.elements[y][x].style.display = 'block' }, x*200 )
      }
    }
    setTimeout(() => { this.hide() }, 3000 )
  }

  hide() {
    for(let y in this.elements) {
      for(let x in this.elements[y]) {
        this.elements[y][x].style.display = 'none'
      }
    }
  }

}
