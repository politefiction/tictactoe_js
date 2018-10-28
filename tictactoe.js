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

const p1 = Player("Jane", "X");
const p2 = Player("Chris", "O");
let currentPlayer = p1;

const GameControl = (() => {
    const runGame = () => {
        Gameboard.clearBoard();
        squares.forEach((square) => { square.onclick = () => {
            currentPlayer.chooseSquare(square);
            currentPlayer = (currentPlayer === p1 ? p2 : p1);
        } })
    }
    return { runGame }
})();

const newGame = document.querySelector("button");
newGame.onclick = () => { GameControl.runGame(); }

GameControl.runGame();
