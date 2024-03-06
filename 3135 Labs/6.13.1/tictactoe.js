let playerTurn = true;
let computerMoveTimeout = 0;

const gameStatus = {
	MORE_MOVES_LEFT: 1,
	HUMAN_WINS: 2,
	COMPUTER_WINS: 3,
	DRAW_GAME: 4
};

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
	// Setup the click event for the "New game" button
	const newBtn = document.getElementById("newGameButton");
	newBtn.addEventListener("click", newGame);

	// Create click-event handlers for each game board button
	const buttons = getGameBoardButtons();
	for (let button of buttons) {
		button.addEventListener("click", function () { boardButtonClicked(button); });
	}

	// Clear the board
	newGame();
}

// Returns an array of 9 <button> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoardButtons() {
	return document.querySelectorAll("#gameBoard > button");
}

function checkForWinner() {
	
	const buttons = getGameBoardButtons();

	// Ways to win
	const possibilities = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
		[0, 4, 8], [2, 4, 6] // diagonals
	];

	// Check for a winner first
	for (let indices of possibilities) {
		if (buttons[indices[0]].innerHTML !== "" &&
			buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
			buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
			
			// Found a winner
			if (buttons[indices[0]].innerHTML === "X") {
				return gameStatus.HUMAN_WINS;
			}
			else {
				return gameStatus.COMPUTER_WINS;
			}
		}
	}

	// See if any more moves are left
	for (let button of buttons) {
		if (button.innerHTML !== "X" && button.innerHTML !== "O") {
			return gameStatus.MORE_MOVES_LEFT;
		}
	}

	// If no winner and no moves left, then it's a draw
	return gameStatus.DRAW_GAME;
}

function newGame() {
    // Clear the computer's move timeout if it exists
    clearTimeout(computerMoveTimeout);
    computerMoveTimeout = 0;

    // Get all game board buttons
    const buttons = getGameBoardButtons();

    // Loop through all game board buttons
    for (let button of buttons) {
        // Set innerHTML to empty string
        button.innerHTML = "";
        // Remove class name
        button.className = "";
        // Remove disabled attribute
        button.removeAttribute("disabled");
    }

    // Allow the player to take a turn
    playerTurn = true;

    // Set turn information paragraph text to "Your turn"
    document.getElementById("turnInfo").textContent = "Your turn";
}

function boardButtonClicked(button) {
    // If it's the player's turn and the button is not already marked
    if (playerTurn && button.innerHTML === "") {
        // Set the button's inner HTML to "X"
        button.innerHTML = "X";
        // Add the "x" class to the button
        button.classList.add("x");
        // Disable the button
        button.disabled = true;
        // Switch turn to the computer
        switchTurn();
    }
}

function switchTurn() {
    // Check for game status
    const status = checkForWinner();

    // If there are more moves left
    if (status === gameStatus.MORE_MOVES_LEFT) {
        // Toggle playerTurn value
        playerTurn = !playerTurn;

        // Update turn information paragraph text
        if (playerTurn) {
            document.getElementById("turnInfo").textContent = "Your turn";
        } else {
            document.getElementById("turnInfo").textContent = "Computer's turn";
            // Set a timeout for the computer's move
            computerMoveTimeout = setTimeout(makeComputerMove, 1000);
        }
    } else {
        // No more moves left or there's a winner
        playerTurn = false;
        if (status === gameStatus.HUMAN_WINS) {
            document.getElementById("turnInfo").textContent = "You win!";
        } else if (status === gameStatus.COMPUTER_WINS) {
            document.getElementById("turnInfo").textContent = "Computer wins!";
        } else {
            document.getElementById("turnInfo").textContent = "Draw game";
        }
    }
}

function makeComputerMove() {
    // Get all game board buttons
    const buttons = getGameBoardButtons();

    // Filter available buttons
    const availableButtons = Array.from(buttons).filter(button => button.innerHTML === "");

    // Choose a random available button
    const randomIndex = Math.floor(Math.random() * availableButtons.length);
    const chosenButton = availableButtons[randomIndex];

    // Set the button's inner HTML to "O"
    chosenButton.innerHTML = "O";
    // Add the "o" class to the button
    chosenButton.classList.add("o");
    // Disable the button
    chosenButton.disabled = true;

    // Switch back to the player's turn
    switchTurn();
}
