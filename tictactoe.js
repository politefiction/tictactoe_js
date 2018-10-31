const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

let currentPlayer;

const Gameboard = (() => {
    const squares = queryAll(".square");

    const clearBoard = () => {
        squares.forEach((square) => { square.textContent = ""; })
    }

    const startNewGame = () => { 
        let newGameboard = confirm("Are you sure you want to start a new game?")
        if (newGameboard) {
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
            arr = query(vector).firstChild ?
                [].slice.call(query(vector).children) :
                [].slice.call(queryAll(vector));
        } else {
            vector.map(ind =>  arr.push(squares[ind]) );
        }
        vecArrays.push(arr);
    })

    const didSomeoneWin = () => {
        return vecArrays.some(vec => vec.every(sq => 
            sq.textContent === currentPlayer.marker)
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
    let turn = query("#turn");
    const displayCurrentPlayer = () => {
        turn.textContent = `Current turn: ${currentPlayer.name}`;
    }
    return { displayCurrentPlayer }
})();

const GameController = (() => {
    let p1;
    let p2;

    const establishPlayers = () => {
        p1 = Player(prompt("Player 1, enter your name"), "X");
        p2 = Player(prompt("Player 2, enter your name"), "O");
        currentPlayer = p1;
    }
    
    const runGame = () => {
        establishPlayers();
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

const newGame = query("button");
newGame.onclick = () => { Gameboard.startNewGame(); }

// const p1 = Player(prompt("Player 1, enter your name"), "X");
// const p2 = Player(prompt("Player 2, enter your name"), "O");
// const currentPlayer = p1;

GameController.runGame();

//const establishPlayers = () => {
    //let p1 = Player(prompt("Player 1, enter your name"), "X")
    //let p2 = Player(prompt("Player 2, enter your name"), "O")
    //return { p1, p2 }
//}