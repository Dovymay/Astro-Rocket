class Obstacle {
    constructor(gamescreen, left = 750) {
       this.gamescreen = gamescreen
       this.left = left
       this.top = Math.random () * 300
       this.width = 120
       this.height = 50
       this.element = document.createElement('img')
       this.element.src = 'images/Asteroid.png'
       this.element.style.width = `${this.width}px`
       this.element.style.height = `${this.height}px`
       this.element.style.left = `${this.left}px`
       this.element.style.top = `${this.top}px`
       this.element.style.position = 'absolute'
       //Avoid the overlapping
       this.element.style.zIndex = "10"
       //Add to HTML
       this.gamescreen.appendChild(this.element)
    }
    move(){
        this.left -= 4
        this.updatePosition()
    }
    updatePosition() {
       this.element.style.left = `${this.left}px`
       this.element.style.top = `${this.top}px`
    }
}