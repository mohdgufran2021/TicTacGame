const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(event) {
    const cell = event.target;
    cell.textContent = currentPlayer;
    cell.classList.add('disabled');
    
    if (checkWinner()) {
        setTimeout(() => alert(`Wins!`), 100);
        resetGame();
    } else if (isDraw()) {
        setTimeout(() => alert("It's a draw!"), 100);
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
}
