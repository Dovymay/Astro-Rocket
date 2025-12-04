window.onload = function () {
    const startButton = document.getElementById("pulse-start")
    const restartButton = document.getElementById("pulse-restart");
    let ourNewGame

    startButton.addEventListener("click", function () {
    startGame();
  });

    restartButton.addEventListener("click", () => {
        window.location.reload()
    })

  function startGame() {
    ourNewGame = new Game()
    ourNewGame.start()
  }

//Event listeners for the player
window.addEventListener("keydown", (event) => {
    if(event.code === 'ArrowRight'){
        ourNewGame.player.directionX = 3
    }
    if(event.code === 'ArrowLeft'){
        ourNewGame.player.directionX = -5
    }
    if(event.code === 'ArrowUp'){
        ourNewGame.player.directionY = -3
    }
    if(event.code === 'ArrowDown'){
        ourNewGame.player.directionY = 3
    }
    if(event.code === 'Space'){
        ourNewGame.shoot()
    }
})
window.addEventListener("keyup", (event) => {
    if(event.code === 'ArrowRight'){
        ourNewGame.player.directionX = 0
    }
    if(event.code === 'ArrowLeft'){
        ourNewGame.player.directionX = 0
    }
    if(event.code === 'ArrowUp'){
        ourNewGame.player.directionY = 0
    }
    if(event.code === 'ArrowDown'){
        ourNewGame.player.directionY = 0
    }
})
}

