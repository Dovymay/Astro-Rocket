class Player{
    constructor(gamescreen, left, top, width, height) {
       this.gamescreen = gamescreen
       this.left = left
       this.top = top
       this.width = 200
       this.height = 100
       this.directionX = 0
       this.directionY = 0
       this.element = document.createElement('img')
       this.element.src = 'images/Subject.png'
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
        this.left += this.directionX
        this.top += this.directionY
        //Keep the player inside of game background
        //Keep him off the left
        if(this.left < 0){
            this.left = 0
        }
        //Keep him off the right
        if(this.left + 200 > 750){
            this.left = 550
        }
        //Keep him off the top
        if(this.top < 0){
            this.top = 0
        }
        //Keep him off the bottom
        if(this.top + 100 > 450){
            this.top = 350
        }
        this.updatePosition()
    }
    updatePosition() {
       this.element.style.left = `${this.left}px`
       this.element.style.top = `${this.top}px`
    }
    didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}