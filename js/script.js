//unordered list where player's guesses go
const guessedLettersElement = document.querySelector(".guessed-letters");
//Guess button
const guessButton = document.querySelector(".guess");
//input for text
const inputLetter = document.querySelector(".letter");
//word in progress 
const wordInProgress = document.querySelector(".word-in-progress");
//remaining letters
const remainingGuesses = document.querySelector(".remaining");
//remaining guesses will appear
const numOfRemainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message")
const playAgainButton = document.querySelector(".play-again")
const word = "magnolia";
const guessedLetters = [];

const updatePlaceHolder = function (word){
    const placeHolderLetter = [];
    for(const letter of word){
        console.log(letter);
        placeHolderLetter.push("●");     
    }
    wordInProgress.innerText = placeHolderLetter.join("");
};

updatePlaceHolder(word);


guessButton.addEventListener("click", function(e){
    const inputValue = document.querySelector("input.letter");
    e.preventDefault();
    //empty message paragraph
    inputValue.value = "";
    //console.log(e.target.inputValue)
    validatePlayerInput(inputValue);
    const guess = letterInput.value;
    
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
      letterInput.value = "";

});

//Validating player's input 
const validatePlayerInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;

//return messages checking if player's input is a single letter only
    if(input.length === 0){
        message.innerText = `Please enter a letter`;
    //Guessing more than one letter at a time
    } else if(input.length > 1){
        message.innerText = `Only one guess at a time, please`;
    //Guess is not an accepted letter ie symbol or number
    } else if (!input.matches(acceptedLetter)){
        message.innerText = `Please enter only letters`;
    } else {
        return input} ;

}

//function that will check input
const makeGuess = function(guess){
    guess=guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You already guessed that Letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters)
    }
}