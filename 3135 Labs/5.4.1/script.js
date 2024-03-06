function playGuessingGame(numToGuess, totalGuesses = 10) {
    let guesses = 0;
    let guess;
    let promptText = "Enter a number between 1 and 100.";

    while (guesses < totalGuesses) {
        guess = prompt(promptText);
        
        if (guess === null) {
            return 0; // User pressed cancel, return 0 immediately.
        }
        
        if (guess === "" || isNaN(parseInt(guess, 10))) {
            promptText = "Please enter a number.";
            continue; // Ask for input again.
        }
        
        guess = parseInt(guess, 10);
        guesses++;

        if (guess === numToGuess) {
            return guesses; // User guessed correctly, return number of guesses.
        } else if (guess < numToGuess) {
            promptText = guess + " is too small. Guess a larger number.";
        } else {
            promptText = guess + " is too large. Guess a smaller number.";
        }
    }

    return 0; // If user exhausts all guesses without guessing correctly.
}
