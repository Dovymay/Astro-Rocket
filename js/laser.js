class Laser {
    constructor(gameScreen, left, top) {
        this.gameScreen = gameScreen
        this.left = left
        this.top = top
        this.width = 50
        this.height = 10
        this.element = document.createElement("img")
        this.element.src = "images/Laser.png"
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.style.position = "absolute"
        this.element.style.zIndex = "20"
        this.gameScreen.appendChild(this.element)
    }

    //Movement of the laser
    move() {
        this.left += 6 
        this.updatePosition()
    }
    updatePosition() {
       this.element.style.left = `${this.left}px`
       this.element.style.top = `${this.top}px`
    }
}