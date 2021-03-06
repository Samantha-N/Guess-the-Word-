//unordered list where player's guesses go
const guessedLettersElement = document.querySelector(".guessed-letters");
//Guess button
const guessButton = document.querySelector(".guess");
//input for text
const inputLetter = document.querySelector(".letter");
//word in progress 
const wordInProgress = document.querySelector(".word-in-progress");
//remaining letters
const remainingGuessesElement = document.querySelector(".remaining");
//remaining guesses will appear
const numOfRemainingGuessesSpan = document.querySelector(".remaining span");
//Message that will log out
const message = document.querySelector(".message");

const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    updatePlaceHolder(word);
  };

getWord();

//Display symbols as placeholders for the chosen word's letters
const updatePlaceHolder = function (word) {
    const placeHolderLetters = [];
    for(const letter of word){
        //console.log(letter);
        placeHolderLetters.push("●");     
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

guessButton.addEventListener("click", function(e) {
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
        message.innerText = `Please enter a letter.`;

    //Guessing more than one letter at a time
    } else if(input.length > 1){
        message.innerText = `Only one letter may be guessed at a time. Try again.`;
    //Guess is not an accepted letter ie symbol or number
    } else if (!input.match(acceptedLetter)){
        message.innerText = `Only letters are allowed. Please enter a letter A - Z.`;
    }   else {
        return input
    } 
};

//function that will check input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You already guessed that Letter. Try again.`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateRemainingGuesses(guess);
        showPlayersGuesses();
        udpateWordInProgress(guessedLetters);
    }
};

//function that will show the guessed letters

const showPlayersGuesses = function () {
    //empty player's guessed letters
    guessedLettersElement.innerHTML = "";
    //created a new list item for each letter inside guessedLetters array
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
    }
};



//function to update the word in progress (will replace the "●")
    const udpateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase()); 
         } else {
             revealWord.push ("●");
        }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    winChecker();
};

//Function to check remaining guesses
const updateRemainingGuesses = function (guess) {
    const wordUppercase = word.toUpperCase();
    if (!wordUppercase.includes(guess)) {
        message.innerText = `Sorry there are no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `The game is over. The word was <span class ="hightlight">${word}</span>`;
        startOver();

    } else if (remainingGuesses === 1) {
        numOfRemainingGuessesSpan.innerText = `${remainingGuesses} guess remaining.`;
    } else {
        numOfRemainingGuessesSpan.innerText = `${remainingGuesses} guesses left`;
    }
};


//function to check if player won
const winChecker =  function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.innerHTML = `<p class ="highlight">You guessed the correct word! Congrats!</p>`;
        message.classList.add = ("win");

        startOver();
}
};

//Play again
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//Play again button 
playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    numOfRemainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    
    //get a new word
    getWord();

    playAgainButton.classList.add("hide");
    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    }
);