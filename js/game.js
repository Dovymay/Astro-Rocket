class Game {
    constructor () {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.livesElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");
    this.gameContainer = document.getElementById("game-container")
    this.player = new Player(this.gameScreen, 0, 300);
    this.height = 450;
    this.width = 750;
    this.obstacles = [new Obstacle (this.gameScreen, 450)];
    this.lasers = []
    this.score = 0
    this.lives = 5
    this.gameIsOver = false
    this.counter = 0
    this.gameIntervalId
    this.gameLoopFrequency = Math.round(1000/60)
    this.gameSound = new Audio("audio/Futurama-Theme-Song.mp3")
}
start (){
    //Set the height and the width of the game screen
    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    //Hide the start screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameSound.play()
    //Create the set interval for the 60 
    this.gameIntervalId = setInterval(()=>{
        this.gameLoop ()
    }, this.gameLoopFrequency)
}
gameLoop (){
this.update()
this.counter++
if(this.gameIsOver) {
    clearInterval(this.gameIntervalId)
    this.gameOver()
}
}
update() {
    this.player.move()
    //Obstacles loop
    for (let i = 0; i < this.obstacles.length; i++) {
    const currentObstacle = this.obstacles[i]
    currentObstacle.move()
    this.lasers.forEach((laser, index) => {
        laser.move()
        const laserRect = laser.element.getBoundingClientRect()
        const obstacleRect = currentObstacle.element.getBoundingClientRect()
       
        //Check for obstacle and laser collision
        if (
          laserRect.left < obstacleRect.right &&
          laserRect.right > obstacleRect.left &&
          laserRect.top < obstacleRect.bottom &&
          laserRect.bottom > obstacleRect.top
        ) {
        //Update score if the asteroid was hit by the laser
        this.score += 10
        this.scoreElement.innerText = this.score


        const explosion = document.createElement("img")

        //Creating explosion effect 
        explosion.src = "images/explosion.GIF"
        explosion.style.width = `100px`
        explosion.style.height = `100px`
        explosion.style.position = "absolute"
        explosion.style.zIndex = "30"

        // Get positions
        const obstacleRect = currentObstacle.element.getBoundingClientRect();
        const screenRect = this.gameScreen.getBoundingClientRect();

        // Center explosion on the obstacle
        const explosionLeft = obstacleRect.left - screenRect.left + obstacleRect.width / 2 - 50;
        const explosionTop  = obstacleRect.top - screenRect.top + obstacleRect.height / 2 - 50;

        explosion.style.left = `${explosionLeft}px`;
        explosion.style.top = `${explosionTop}px`;


        this.gameScreen.appendChild(explosion)

        //Timeout to stop the explosion effect
          setTimeout(() => {
            explosion.remove()
          }, 1000)

         this.lasers.splice(index, 1)
          this.obstacles.splice(i, 1)
          laser.element.remove()
          currentObstacle.element.remove()
        }
        //Remove laser if it passes right side of screen
        if (laser.left > 800) {
          laser.element.remove()
          this.lasers.splice(index, 1)
        }
    });

    
    if (currentObstacle.left < -200) {
    //If obstacle passes the left
    this.obstacles.splice(i, 1)
    //Removes the obstacle from the html code
    currentObstacle.element.remove()
    //If obstacle was not destroyed then a live is deducted
    this.lives--
    this.livesElement.innerText = this.lives
    if(this.lives === 0){
        this.gameIsOver = true
    }
    }

    //Check for collision
    if(this.player.didCollide(currentObstacle)){
    //If obstacle passes the left
    this.obstacles.splice(i, 1)
    //Removes the obstacle from the html code
    currentObstacle.element.remove()
    //Update the amount of lives
    this.lives--
    this.livesElement.innerText = this.lives
    if(this.lives === 0){
        this.gameIsOver = true
    }
    }
    }

// //Adding new obstacles randomly 
// if(this.counter % 120 === 0){
//     const randomLeft = this.width + 200 // Spawn obstacles off screen
//     this.obstacles.push(new Obstacle (this.gameScreen, randomLeft))
// }

// // Add extra obstacles, if score >= 300 - Lv2
// if(this.score >= 300){
// if(this.counter % 200 === 0){
//     const randomLeft = this.width + 200 // Spawn obstacles off screen
//     this.obstacles.push(new Obstacle (this.gameScreen, randomLeft))
// }
// }

//Add extra obstacles with increased difficulty - 4 levels in total
if(this.score >= 1000){
  if(this.counter % 30 === 0){
       const randomLeft = this.width + 200 // Spawn obstacles off screen
       this.obstacles.push(new Obstacle (this.gameScreen, randomLeft))
}
}
else if(this.score >= 600){
  if(this.counter % 60 === 0){
       const randomLeft = this.width + 200 
       this.obstacles.push(new Obstacle (this.gameScreen, randomLeft))
}
}
else if(this.score >= 300){
  if(this.counter % 80 === 0){
       const randomLeft = this.width + 200
       this.obstacles.push(new Obstacle (this.gameScreen, randomLeft))
}
}
else{
  if(this.counter % 120 === 0){
       const randomLeft = this.width + 200
       this.obstacles.push(new Obstacle (this.gameScreen, randomLeft))
}
}
}


gameOver() {
    this.gameScreen.style.display = "none"
    this.gameEndScreen.style.display = "block"
    this.gameSound.pause()
}

shoot() {

    // get the player's rendered rectangle and the game screen rectangle
  const playerRect = this.player.element.getBoundingClientRect();
  const screenRect = this.gameScreen.getBoundingClientRect();

  // laser should spawn at the nose (right edge) of the ship
  const laserLeft = (playerRect.right - screenRect.left); // right edge of player relative to gameScreen
  const laserTop  = (playerRect.top - screenRect.top) + (playerRect.height / 2) - (10 / 2); // center vertically; 10 = laser.height


    this.lasers.push(
      new Laser(
        this.gameScreen,
        laserLeft,
        laserTop,
      )
    )
  }
}
