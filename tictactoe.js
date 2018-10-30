const Gameboard = (() => {
    const squares = document.querySelectorAll(".square");

    const clearBoard = () => {
        squares.forEach((square) => { square.textContent = ""; })
    }

    const startNewGame = () => { 
        let newGameboard = confirm("Are you sure you want to start a new game?")
        if (newGameboard) {
            currentPlayer = p1;
            clearBoard();
            GameController.runGame();
        }
    }

    const vectors = [".left", ".vtmiddle", ".right", 
                    ".top", ".hzmiddle", ".bottom", 
                    [0, 4, 8], [2, 4, 6]];
    const vecArrays = [];
    vectors.map((vector) => {
        let arr = [];
        if (typeof vector === "string") {
            arr = document.querySelector(vector).firstChild ?
                [].slice.call(document.querySelector(vector).children) :
                [].slice.call(document.querySelectorAll(vector));
        } else {
            vector.map(ind =>  arr.push(squares[ind]) );
        }
        vecArrays.push(arr);
    })

    const didSomeoneWin = () => {
        return vecArrays.some(vec => vec.filter(sq => 
            sq.textContent === currentPlayer.marker).length === 3
        )
    }

    return { squares, startNewGame, didSomeoneWin }
})();

const Player = (name, marker) => {
    const chooseSquare = (square) => {
        if (square.textContent === "") {
            square.textContent = marker;
        }
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
        DisplayContoller.displayCurrentPlayer();
        Gameboard.squares.forEach((square) => { square.onclick = () => {
            currentPlayer.chooseSquare(square);
            if (Gameboard.didSomeoneWin()) {
                return console.log(`${currentPlayer.name} has won!`);
                // prompt for new game
            }
            currentPlayer = (currentPlayer === p1 ? p2 : p1);
            DisplayContoller.displayCurrentPlayer();
        } })
    }
    return { runGame }
})();

const newGame = document.querySelector("button");
newGame.onclick = () => { Gameboard.startNewGame(); }

const p1 = Player("Jane", "X");
const p2 = Player("Chris", "O");
let currentPlayer = p1;

GameController.runGame();

