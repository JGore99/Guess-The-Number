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
  } else {
    this.processGuess()
    this.handleResponse()
  }
    
}

game.generateNum = function() {
  this.secretNum = Math.floor(Math.random() * 
    (this.biggestNum - this.smallestNum + 1)) + this.smallestNum
    console.log(this.secretNum) //REMOVE LATER
}

game.processGuess = function() {
  this.currentGuess = parseInt(numInput.value)
  
}

game.handleResponse = function() {
  console.log(this.currentGuess)
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
    // this.resetPreviousGuess()
    // this.generateNum()
  } else if (game.secretNum > game.currentGuess){
    response.innerHTML = "Your guess is too low. </br> Please try again." // REMEBER THE LINE BREAKS HERE, MIGHT NOT BE BEST PRACTICE
  } else {
    response.innerHTML = "Your guess is too high. </br> Please try again."
  }
}

game.buttonChangeOnWin = function() {
  playBtn.innerHTML = "Play Again!"
}

game.buttonResetToPlay = function() {
  playBtn.innerHTML = "Play"
}

game.resetPreviousGuess = function() {
  this.prevGuesses = []
}

game.logPreviousGuesses = function() {
  this.prevGuesses.push(this.currentGuess)
  console.log(this.prevGuesses)
}

game.showPreviousGuesses = function() {
  let prevGuessesJoined = this.prevGuesses.join(" ")
  previousGuesses.innerHTML = prevGuessesJoined
}

const boundStart = game.start.bind(game)
playBtn.addEventListener("click", boundStart)
numInput.addEventListener("keypress", function(e) {
  if(e.key === "Return" || e.key === "Enter") {
    boundStart()
  }
})


window.onload = game.generateNum()

// 1. Add a `prevGuesses` property to the `game` object initialized to an empty array.

// 2. Add a `getGuess` method to `game` that prompts the player to enter a guess with a message formatted as: *Enter a guess between [smallestNum] and [biggestNum]:*. Hint - use a template literal for the prompt message.

// 3. Ensure that the `getGuess` method returns a value that:
//     - Is a *number*, not a *string*.
//     - Is between `smallestNum` and `biggestNum`, inclusive.
//     - Hints:
//         - This is a great use case for a `while` loop.
//         - `parseInt` returns `NaN` if the string cannot be parsed into a number.

// 4. From within the `play` method, invoke the `getGuess` method from inside a loop, and add the new guess to the `prevGuesses` array.

//     - Hint: this is a great use for a while loop (or even a do...while loop!)

// 5. Add a `render` method to `game` that `play` will call after a guess has been made that alerts:
//     - If the secret has been guessed: `Congrats! You guessed the number in [number of prevGuesses]!`
//     - Otherwise: `Your guess is too [high|low] Previous guesses: x, x, x, x`
//     - Hints:
//         - `render` won’t be able to access any of `play`’s local variables, e.g., 
//          `guess`, so be sure pass `render` any arguments as needed (you may have not built your program to use any, that's ok if that's the case!)
//         - Template literals not only have interpolation, but they also honor whitespace - including line breaks!
//         - The list of previous guesses can be generated using the array `join` method.

// 6. The `play` method should end (`return`) when the guess matches `secretNum`.


// 1) generate number
// 2) prompt player to make guess
// 3) check if guess isNaN or not.
// 4) parseINt if not
// 4.5) clear input
// 5) compare guess to generated num
// 6) if match, player wins. run win sequence
// 7) if not match, prompt player to guess again