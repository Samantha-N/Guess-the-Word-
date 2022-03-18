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

//Display symbols as placeholders for the chosen word's letters
const updatePlaceHolder = function (word) {
    const placeHolderLetters = [];
    for(const letter of word){
        console.log(letter);
        placeHolderLetters.push("●");     
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

updatePlaceHolder(word);



guessButton.addEventListener("click", function(e){
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    //Grabbing what was entered in the input.
    const guess = inputLetter.value;
    
    const goodGuess = validatePlayerInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
      inputLetter.value = "";
});

//Validating player's input 
const validatePlayerInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;

//return messages checking if player's input is a single letter only
    if(input.length === 0){
        message.innerText = `Please enter a letter`;

    //Guessing more than one letter at a time
    } else if(input.length > 1){
        message.innerText = `Only one letter may be guesses at a time. Try again.`;
    //Guess is not an accepted letter ie symbol or number
    } else if (!input.match(acceptedLetter)){
        message.innerText = `Only letters are allowed. Please enter a letter A - Z.`;
    }   else {
        return input
    } 
};

//function that will check input
const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = `You already guessed that Letter. Try again.`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters)
        showPlayersGuesses();
        udpateWordInProgress(guessedLetters);
    }
};

//function that will show the guessed letters

const showPlayersGuesses = function () {
    //empty player's guessed letters
    guessedLettersElement.innerHtml = "";
    //created a new list item for each letter inside guessedLetters array
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};



//function to update the word in progress (will replace the "●")
    const udpateWordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase()); 
         } else {
             revealWord.push = ("●");
        }
    }
    //console.log(wordArray);
    wordInProgress.innerText = revealWord.join("");
    winChecker();
};


//function to check if player won
const winChecker =  function (){
    if (word.toUpperCase === wordInProgress.innerText){
        message.innerHTML = `<p class ="highlight">You win! Congrats!</p>`
        message.classList.add = ("win");
}
};