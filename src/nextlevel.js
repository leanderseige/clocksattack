export default class NextLevel {

  constructor(globals) {
    this.globals = globals
    this.frame = document.getElementById('level_background')
    this.text = [ ['L','E','V','E','L'], ['x'] ]
    this.elements = [[],[]]
    for(let x in this.text[0]) {
      this.elements[0][x]=document.createElement('div')
      this.elements[0][x].className='nextlevelA'
      this.elements[0][x].style.display = 'none'
      this.elements[0][x].style.top = (2.5+2*10)+"vh"
      this.elements[0][x].style.left = (2.5+x*10)+"vh"
      this.elements[0][x].style.animationDuration = 500+Math.random()*500
      this.elements[0][x].innerHTML = this.text[0][x]
      this.frame.appendChild(this.elements[0][x])
    }
    this.elements[1][0]=document.createElement('div')
    this.elements[1][0].className='nextlevelB'
    this.elements[1][0].style.display = 'none'
    this.elements[1][0].style.top = (2.5+4*10)+"vh"
    this.elements[1][0].style.left = "25vh"
    this.elements[1][0].style.animationDuration = 500+Math.random()*500
    this.elements[1][0].innerHTML = this.text[1][0]
    this.frame.appendChild(this.elements[1][0])
  }

  show(number) {
    this.elements[1][0].innerHTML = number
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
