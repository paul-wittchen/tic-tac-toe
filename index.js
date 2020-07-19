const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const cells = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningTextElement = document.querySelector("[data-message]")
const winningElement = document.getElementById("message")
const restartBtn = document.getElementById("button")
let circleTurn

startGame()

function startGame() {
    circleTurn = false
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    hoverClass()
    winningElement.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // place Mark
    placeMark(cell, currentClass)
    // check for win
    if (checkWin(currentClass)) {
        endGame(false)
        // check for draw
    } else if (isDraw()) {
        endGame(true)
        // switch turns
    } else {
        swapTurns()
        hoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function hoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningTextElement.innerText = `Draw!`
    } else {
        winningTextElement.innerText = `${circleTurn ? "O´s wins!" : "X´s wins!"}`
    }
    winningElement.classList.add("show")
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(CIRCLE_CLASS) || 
        cell.classList.contains(X_CLASS)
    })
}

restartBtn.addEventListener("click", startGame)
