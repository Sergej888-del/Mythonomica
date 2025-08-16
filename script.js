// JavaScript for the modern website

document.addEventListener('DOMContentLoaded', () => {
    const sieveGrid = document.getElementById('sieve-grid');
    if (!sieveGrid) {
        // Not on the primegesis page, so do nothing.
        return;
    }

    const startBtn = document.getElementById('start-sieve-btn');
    const maxNumber = 100;

    // --- 1. Generate the number grid ---
    function generateSieveGrid() {
        sieveGrid.innerHTML = ''; // Clear previous grid
        for (let i = 2; i <= maxNumber; i++) {
            const cell = document.createElement('div');
            cell.classList.add('number-cell');
            cell.id = `cell-${i}`;
            cell.textContent = i;
            sieveGrid.appendChild(cell);
        }
    }

    // --- 2. Animation Logic ---
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    async function startSieveAnimation() {
        startBtn.disabled = true;
        generateSieveGrid(); // Reset grid before starting

        let isPrime = Array(maxNumber + 1).fill(true);
        isPrime[0] = isPrime[1] = false;

        for (let p = 2; p * p <= maxNumber; p++) {
            if (isPrime[p]) {
                // Highlight the current prime number
                const primeCell = document.getElementById(`cell-${p}`);
                if (primeCell) {
                    primeCell.classList.add('prime');
                    await sleep(500); // Pause to show which prime we're using
                }

                // Mark all multiples of p as not prime
                for (let i = p * p; i <= maxNumber; i += p) {
                    if (isPrime[i]) {
                        isPrime[i] = false;
                        const compositeCell = document.getElementById(`cell-${i}`);
                        if (compositeCell) {
                            compositeCell.classList.add('composite');
                            await sleep(50); // Short delay for each multiple
                        }
                    }
                }
            }
        }

        // --- 3. Highlight all remaining prime numbers ---
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

    // --- 4. Attach event listener ---
    generateSieveGrid(); // Initial grid generation
    startBtn.addEventListener('click', startSieveAnimation);

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
                let C_nk = 1; // First element is always 1
                for (let k = 0; k <= n; k++) {
                    const numberSpan = document.createElement('span');
                    numberSpan.classList.add('pascal-number');
                    numberSpan.textContent = C_nk;
                    numberSpan.title = `C(${n}, ${k})`;
                    numberSpan.dataset.n = n;
                    numberSpan.dataset.k = k;
                    rowDiv.appendChild(numberSpan);
                    // Calculate next coefficient C(n, k+1) using C(n, k)
                    C_nk = C_nk * (n - k) / (k + 1);
                }
                triangleDiv.appendChild(rowDiv);
            }
        }

        async function highlightFibonacci() {
            fibonacciBtn.disabled = true;
            // Clear previous highlights
            document.querySelectorAll('.fibonacci-highlight').forEach(el => {
                el.classList.remove('fibonacci-highlight');
            });

            await sleep(300);

            const maxDiagonalSum = (numRows - 1); // n+k for the last element in the first column
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
});
