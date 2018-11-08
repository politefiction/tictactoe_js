const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

let currentPlayer;

const Gameboard = (() => {
    const squares = queryAll(".square");

    const clearBoard = () => {
        squares.forEach((square) => { square.textContent = ""; })
    }

    const startNewGame = () => { 
        let newGameboard = (didSomeoneWin() || isBoardFull()) ?
            true : confirm("Are you sure you want to start a new game?");
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

    const isBoardFull = () => {
        squArray = [].slice.call(squares);
        return squArray.every(sq => sq.textContent != "")
    }

    return { squares, startNewGame, didSomeoneWin, isBoardFull }
})();

const Player = (name, marker) => {
    const chooseSquare = (square) => {
        if (square.textContent === "") {
            square.textContent = marker;
        }
    }
    return { name, marker, chooseSquare }
}

const Display = (() => {
    const turn = query("#turn");
    const status = query("#status");

    const showWhoseTurn = () => {
        turn.textContent = `Current turn: ${currentPlayer.name}`;
    }

    const giveStatus = () => { 
        if (Gameboard.didSomeoneWin()) {
            status.textContent = `${currentPlayer.name} has won! Click the button above to start a new game!`;
        } else if (Gameboard.isBoardFull()) {
            status.textContent ="Stalemate! Click button above for a new game!";
        } else { 
            status.textContent = "Game in progress."
        }
    }
    
    return { showWhoseTurn, giveStatus }
})();

const GameController = (() => {
    const squArray = [].slice.call(Gameboard.squares);
    let p1;
    let p2;
    
    const establishPlayers = () => {
        let diffNames;
        if ([p1, p2].some(p => p !== undefined)) { 
            diffNames = confirm("Would you like to choose new names?"); 
        }

        if ([p1, p2].some(p => p === undefined) || diffNames) {
            p1 = Player(prompt("Player 1, enter your name"), "X");
            p2 = Player(prompt("Player 2, enter your name"), "O");
        } 

        currentPlayer = p1;
    }

   const takeTurn = (e) => {
        currentPlayer.chooseSquare(e.target);
        if (Gameboard.didSomeoneWin() || Gameboard.isBoardFull()) { 
            return Display.giveStatus();
        } else {
            currentPlayer = (currentPlayer === p1 ? p2 : p1);
            Display.showWhoseTurn();
        };
    }

    const runGame = () => {
        establishPlayers();
        Display.showWhoseTurn();
        Display.giveStatus();
        squArray.map(square => { 
            square.addEventListener('click', takeTurn, false); 
        })

    }
    
    return { runGame }
})();


const newGame = query("button");
newGame.onclick = () => { Gameboard.startNewGame(); }

document.addEventListener("DOMContentLoaded", () => {
    if (confirm("Welcome to Tic Tac Toe! Would you like to play?")) {
        GameController.runGame();
    } else {
        alert("Huh, alright. Well, just hit that button when you're ready, then.")
    }
})

/*

*/