
const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const resetScores = document.querySelector("#resetScores");
const statusText = document.querySelector("#status");
const result = document.querySelector("#result");
const turnBadge = document.querySelector("#turnBadge");

const scoreXElement = document.querySelector("#scoreX");
const scoreOElement = document.querySelector("#scoreO");
const scoreDrawElement = document.querySelector("#scoreDraw");

let turn0 = true;
let gameOver = false;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function updateTurn() {
    const player = turn0 ? "X" : "O";

    statusText.innerText = `Player ${player}'s turn`;
    turnBadge.innerText = player;

    turnBadge.style.background =
        turn0 ? "#b9d98b" : "#c4a7ff";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;

        const player = turn0 ? "X" : "O";

        box.innerText = player;
        box.disabled = true;

        if (player === "O") {
            box.classList.add("o-mark");
        }

        result.innerText = "Good move! Keep going.";

        if (checkWinner()) return;

        if ([...boxes].every(box => box.innerText !== "")) {
            gameOver = true;
            scoreDraw++;

            updateScores();

            statusText.innerText = "It's a draw!";
            result.innerText = "A close game! Try another round.";
            return;
        }

        turn0 = !turn0;
        updateTurn();
    });
});

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const value = boxes[a].innerText;

        if (
            value !== "" &&
            value === boxes[b].innerText &&
            value === boxes[c].innerText
        ) {
            gameOver = true;

            pattern.forEach(index => {
                boxes[index].classList.add("winner");
            });

            boxes.forEach(box => {
                box.disabled = true;
            });

            if (value === "X") {
                scoreX++;
            } else {
                scoreO++;
            }

            updateScores();

            statusText.innerText = `Player ${value} wins! 🎉`;
            turnBadge.innerText = value;
            result.innerText = "Victory! Start a new round to play again.";

            return true;
        }
    }

    return false;
}

function updateScores() {
    scoreXElement.innerText = scoreX;
    scoreOElement.innerText = scoreO;
    scoreDrawElement.innerText = scoreDraw;
}

function newRound() {
    turn0 = true;
    gameOver = false;

    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("o-mark", "winner");
    });

    result.innerText = "Make your move and have fun!";
    updateTurn();
}

reset.addEventListener("click", newRound);

resetScores.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    scoreDraw = 0;

    updateScores();
    newRound();

    result.innerText = "Scores cleared. A fresh start!";
});
