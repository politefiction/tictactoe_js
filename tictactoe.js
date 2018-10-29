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

    const vectors = [".left", ".vtmiddle", ".right", 
                    ".top", ".hzmiddle", ".bottom", 
                    [0, 4, 8], [2, 4, 6]];
    const vecArrays = [];
    vectors.forEach((vector) => {
        let arr = [];
        if (typeof vector === "string") {
            arr = document.querySelector(vector).firstChild ?
                [].slice.call(document.querySelector(vector).children) :
                [].slice.call(document.querySelectorAll(vector));
        } else {
            vector.forEach(ind =>  arr.push(squares[ind]) );
        }
        vecArrays.push(arr);
    })

    const didSomeoneWin = () => {
        return vecArrays.some(vec => vec.filter(sq => 
            sq.textContent === currentPlayer.marker).length === 3
        )
    }
    return { addMarker, clearBoard, didSomeoneWin }
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
            if (Gameboard.didSomeoneWin()) {
                return console.log(`${currentPlayer.name} has won!`);
            }
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

