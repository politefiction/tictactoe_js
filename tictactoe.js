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

const Display = (() => {
    const turn = query("#turn");
    const status = query("#status");

    const showWhoseTurn = () => {
        turn.textContent = `Current turn: ${currentPlayer.name}`;
    }

    const giveStatus = (statement) => {
        status.textContent = Gameboard.didSomeoneWin() ?
            `${currentPlayer.name} has won! Click the button above to start a new game!` :
            (statement || "Game in progress")
    }
    
    return { showWhoseTurn, giveStatus }
})();

const GameController = (() => {
    const squArray = [].slice.call(Gameboard.squares);
    const status = query("#status");
    let p1;
    let p2;
    
    const establishPlayers = () => {
        p1 = Player(prompt("Player 1, enter your name"), "X");
        p2 = Player(prompt("Player 2, enter your name"), "O");
        currentPlayer = p1;
    }

   const takeTurn = (e) => {
        currentPlayer.chooseSquare(e.target);
        if (Gameboard.didSomeoneWin()) { 
            victory = true;
            return Display.giveStatus();
        } else if (squArray.every(sq => sq.textContent != "")) {
            return Display.giveStatus("Stalemate! Click button above for a new game!");
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


GameController.runGame();

/*

    const endMoves = () => {
        squArray.map(square => {
            square.removeEventListener('click', takeTurn, true);
        })
    }

*/