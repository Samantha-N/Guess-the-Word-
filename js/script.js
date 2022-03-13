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

const updatePlaceHolder = function (word){
    const placeHolderLetter = [];
    for(const letter of word){
        console.log(letter);
        placeHolderLetter.push("●");     
    }
    wordInProgress.innerText = placeHolderLetter.join("");
};

updatePlaceHolder(word);

//Field where player puts their selection 
guessButton.addEventListener("click", function(e){
    const inputValue = document.querySelector("input.letter");
    e.preventDegault();
    inputValue.value = "";
    //console.log(e.target.inputValue)
    validatePlayerInput(inputValue);
    console.log(inputValue)

});

//Validating player's input
const validatePlayerInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;

    if(input.length === 0){
        message.innerText = `Please enter a letter`;
    } else if(input.length > 1){
        message.innerText = `Only one guess at a time, please`;
    } else if (input.matches(acceptedLetter)){
        message.innerText = `Please enter only letters`;
    } else {
        return input} ;

}