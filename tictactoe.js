const squares = document.querySelectorAll(".square");

const gameboard = (() => {
    const addMarker = (square, marker) => square.textContent = marker;
    // check for victory?
    return { addMarker }
})();

const player = (name, marker) => {
    return { name, marker }
}