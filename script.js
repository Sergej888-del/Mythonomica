// JavaScript for the modern website

document.addEventListener('DOMContentLoaded', () => {
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // --- Sieve of Eratosthenes Logic ---
    const sieveContainer = document.getElementById('sieve-container');
    if (sieveContainer) {
        const sieveGrid = document.getElementById('sieve-grid');
        const startBtn = document.getElementById('start-sieve-btn');
        const maxNumber = 100;

        function generateSieveGrid() {
            sieveGrid.innerHTML = '';
            for (let i = 2; i <= maxNumber; i++) {
                const cell = document.createElement('div');
                cell.classList.add('number-cell');
                cell.id = `cell-${i}`;
                cell.textContent = i;
                sieveGrid.appendChild(cell);
            }
        }

        async function startSieveAnimation() {
            startBtn.disabled = true;
            generateSieveGrid();
            let isPrime = Array(maxNumber + 1).fill(true);
            isPrime[0] = isPrime[1] = false;
            for (let p = 2; p * p <= maxNumber; p++) {
                if (isPrime[p]) {
                    const primeCell = document.getElementById(`cell-${p}`);
                    if (primeCell) {
                        primeCell.classList.add('prime');
                        await sleep(500);
                    }
                    for (let i = p * p; i <= maxNumber; i += p) {
                        if (isPrime[i]) {
                            isPrime[i] = false;
                            const compositeCell = document.getElementById(`cell-${i}`);
                            if (compositeCell) {
                                compositeCell.classList.add('composite');
                                await sleep(50);
                            }
                        }
                    }
                }
            }
            await sleep(500);
            for (let i = 2; i <= maxNumber; i++) {
                if (isPrime[i]) {
                    const cell = document.getElementById(`cell-${i}`);
                    if (cell && !cell.classList.contains('prime')) {
                        cell.classList.add('prime');
                        await sleep(25);
                    }
                }
            }
            startBtn.disabled = false;
        }

        generateSieveGrid();
        startBtn.addEventListener('click', startSieveAnimation);
    }

    // --- Pascal's Triangle Logic ---
    const pascalContainer = document.getElementById('pascal-container');
    if (pascalContainer) {
        const triangleDiv = document.getElementById('pascal-triangle');
        const fibonacciBtn = document.getElementById('fibonacci-btn');
        const numRows = 12;

        function generatePascalTriangle() {
            triangleDiv.innerHTML = '';
            for (let n = 0; n < numRows; n++) {
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('pascal-row');
                let C_nk = 1;
                for (let k = 0; k <= n; k++) {
                    const numberSpan = document.createElement('span');
                    numberSpan.classList.add('pascal-number');
                    numberSpan.textContent = C_nk;
                    numberSpan.title = `C(${n}, ${k})`;
                    numberSpan.dataset.n = n;
                    numberSpan.dataset.k = k;
                    rowDiv.appendChild(numberSpan);
                    C_nk = C_nk * (n - k) / (k + 1);
                }
                triangleDiv.appendChild(rowDiv);
            }
        }

        async function highlightFibonacci() {
            fibonacciBtn.disabled = true;
            document.querySelectorAll('.fibonacci-highlight').forEach(el => {
                el.classList.remove('fibonacci-highlight');
            });
            await sleep(300);
            const maxDiagonalSum = (numRows - 1);
            for (let m = 0; m <= maxDiagonalSum; m++) {
                const diagonalCells = [];
                for (let n = 0; n < numRows; n++) {
                    let k = m - n;
                    if (k >= 0 && k <= n) {
                        const cell = document.querySelector(`[data-n='${n}'][data-k='${k}']`);
                        if (cell) {
                            diagonalCells.push(cell);
                        }
                    }
                }
                if (diagonalCells.length > 0) {
                    diagonalCells.forEach(cell => cell.classList.add('fibonacci-highlight'));
                    await sleep(400);
                    diagonalCells.forEach(cell => cell.classList.remove('fibonacci-highlight'));
                }
            }
            fibonacciBtn.disabled = false;
        }

        generatePascalTriangle();
        fibonacciBtn.addEventListener('click', highlightFibonacci);
    }

    // --- I-Ching Oracle Logic ---
    const oracleContainer = document.getElementById('oracle-container');
    if (oracleContainer) {
        const askBtn = document.getElementById('ask-oracle-btn');
        const hexagramDisplay = document.getElementById('hexagram-display');

        function generateRandomHexagram() {
            hexagramDisplay.innerHTML = '';
            for (let i = 0; i < 6; i++) {
                const lineDiv = document.createElement('div');
                lineDiv.classList.add('hexagram-line');
                const isYin = Math.random() < 0.5;
                if (isYin) {
                    lineDiv.classList.add('yin-line');
                } else {
                    lineDiv.classList.add('yang-line');
                }
                hexagramDisplay.appendChild(lineDiv);
            }
        }
        generateRandomHexagram(); // Generate one on page load
        askBtn.addEventListener('click', generateRandomHexagram);
    }
});
