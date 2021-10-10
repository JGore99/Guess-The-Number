const numInput = document.getElementById("numInput")
const playBtn = document.getElementById("playBtn")
const response = document.querySelector(".response")
const previousGuesses = document.getElementById("previousGuesses")

const game = {
  title: 'Guess the Number!',
  biggestNum: 100,
  smallestNum: 1,
  secretNum: null,
  prevGuesses:  [],
  currentGuess: null,
  gameOver: false,
}

game.start = function() {
  if (this.gameOver){
    this.resetPreviousGuess()
    this.showPreviousGuesses()
    this.generateNum()
    this.gameOver = false
    this.buttonResetToPlay()
    this.resetPreviousGuess()
    this.showPreviousGuesses() 
  } else {
    this.processGuess()
    this.handleResponse()
  }
    
}

game.generateNum = function() {
  this.secretNum = Math.floor(Math.random() * 
    (this.biggestNum - this.smallestNum + 1)) + this.smallestNum
    console.log(this.secretNum) //LEAVE IN FOR REFERENCE
}

game.processGuess = function() {
  this.currentGuess = parseInt(numInput.value)
  
}

game.handleResponse = function() {
  isNaN(this.currentGuess) ? response.innerHTML = "Please only enter numbers below" : game.compareNumbers()
  numInput.value = ""
}

game.compareNumbers = function() {
  this.logPreviousGuesses()
  this.showPreviousGuesses()
  if (game.secretNum === game.currentGuess){
    response.innerHTML = "Congratulations! You win!!!"
    this.gameOver = true
    this.buttonChangeOnWin()
  } else if (game.secretNum > game.currentGuess){
    response.innerHTML = "Your guess is too low. </br> Please try again." 
  } else {
    response.innerHTML = "Your guess is too high. </br> Please try again."
  }
}

game.buttonChangeOnWin = function() {
  playBtn.innerHTML = "Play </br> Again!"
}

game.buttonResetToPlay = function() {
  playBtn.innerHTML = "Play"
}

game.resetPreviousGuess = function() {
  this.prevGuesses = []
}

game.logPreviousGuesses = function() {
  this.prevGuesses.push(this.currentGuess)
}

game.showPreviousGuesses = function() {
  if(this.prevGuesses.length > 0){
    let prevGuessesJoined = this.prevGuesses.join(", ")
    previousGuesses.innerHTML = `<span class="p-title">Previous Guesses</span><br/> ${prevGuessesJoined}`
  } else {
    previousGuesses.innerHTML = ""
  }
}

const boundStart = game.start.bind(game)
playBtn.addEventListener("click", boundStart)
numInput.addEventListener("keypress", function(e) {
  if(e.key === "Return" || e.key === "Enter") {
    boundStart()
  }
})


window.onload = game.generateNum()
