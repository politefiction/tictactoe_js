const squares = document.querySelectorAll(".square");

const Gameboard = (() => {
    const addMarker = (square, marker) => {
        if (square.textContent === "") {
            square.textContent = marker;
        }
    }
    const clearBoard = () => squares.forEach((square) => {
        square.textContent = "";
        // Add check to make sure?
    })
    // check for victory?
    return { addMarker, clearBoard }
})();

const Player = (name, marker) => {
    const chooseSquare = (square) => {
        Gameboard.addMarker(square, marker)
    }
    return { name, marker, chooseSquare }
}

const DisplayContoller = (() => {
    let turn = document.querySelector("#turn");
    const displayCurrentPlayer = () => {
        turn.textContent = `Current turn: ${currentPlayer.name}`;
    }
    return { displayCurrentPlayer }
})();

const GameController = (() => {
    const runGame = () => {
        Gameboard.clearBoard();
        DisplayContoller.displayCurrentPlayer();
        squares.forEach((square) => { square.onclick = () => {
            currentPlayer.chooseSquare(square);
            currentPlayer = (currentPlayer === p1 ? p2 : p1);
            DisplayContoller.displayCurrentPlayer();
        } })
    }
    return { runGame }
})();

const newGame = document.querySelector("button");
newGame.onclick = () => { GameController.runGame(); }

const p1 = Player("Jane", "X");
const p2 = Player("Chris", "O");
let currentPlayer = p1;

GameController.runGame();

// Other notes:
//  define victory conditions
//  allow players to choose own names
//  if allowing players to choose markers, prevent duplicate markers
//  do I need both addMarker and chooseSquare?
