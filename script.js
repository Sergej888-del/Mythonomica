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
                    numberSpan.title = `C(${n}, ${k})`; // Tooltip for mouse users
                    numberSpan.dataset.n = n;
                    numberSpan.dataset.k = k;

                    // Accessibility enhancements
                    numberSpan.setAttribute('role', 'button');
                    numberSpan.setAttribute('tabindex', '0');
                    numberSpan.setAttribute('aria-label', `Coefficient C(${n}, ${k}) is ${C_nk}`);

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

    // --- Interactive Piano Logic ---
    const pianoContainer = document.getElementById('piano-container');
    if (pianoContainer) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const keys = document.querySelectorAll('.key');
        const messageDiv = document.getElementById('chord-message');

        const noteFrequencies = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
            'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
            'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
        };

        const pressedKeys = new Set();
        const cMajorTriad = new Set(['C4', 'E4', 'G4']);
        const harmonyMessage = 'The harmony of this chord, like the structure of the octave (8 white, 5 black, 13 total keys), reflects numbers from the Fibonacci sequence — the mathematical basis of harmony.';

        function playNote(note) {
            const freq = noteFrequencies[note];
            if (!freq || !audioContext) return;

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        }

        function checkChord() {
            if (pressedKeys.size !== cMajorTriad.size) {
                messageDiv.textContent = '';
                return;
            }
            const isCMajor = [...pressedKeys].every(note => cMajorTriad.has(note));

            if (isCMajor) {
                messageDiv.textContent = harmonyMessage;
            } else {
                messageDiv.textContent = '';
            }
        }

        const keyMap = {
            'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
            'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
            'u': 'A#4', 'j': 'B4', 'k': 'C5'
        };
        const keyToNoteMap = new Map(Object.entries(keyMap));
        const noteToKeyMap = new Map(Object.entries(keyMap).map(([key, note]) => [note, key]));

        function handlePress(note, fromKeyboard = false) {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            const keyElement = document.querySelector(`[data-note='${note}']`);
            if (!keyElement || keyElement.classList.contains('active')) return; // Prevent re-triggering

            playNote(note);
            keyElement.classList.add('active');
            pressedKeys.add(note);
            if (!fromKeyboard) { // Only check chord on mouse/touch to avoid complexity
                 checkChord();
            }
        }

        function handleRelease(note) {
            const keyElement = document.querySelector(`[data-note='${note}']`);
            if (!keyElement) return;

            keyElement.classList.remove('active');
            pressedKeys.delete(note);
            checkChord();
        }

        keys.forEach(key => {
            const note = key.dataset.note;
            key.addEventListener('mousedown', (e) => { e.preventDefault(); handlePress(note); });
            key.addEventListener('mouseup', () => handleRelease(note));
            key.addEventListener('mouseleave', () => handleRelease(note));
            key.addEventListener('touchstart', (e) => { e.preventDefault(); handlePress(note); }, { passive: false });
            key.addEventListener('touchend', () => handleRelease(note));

            // Accessibility: Play note on Enter/Space when focused
            key.addEventListener('keydown', (e) => {
                if (e.code === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    handlePress(note);
                }
            });
            key.addEventListener('keyup', (e) => {
                if (e.code === 'Enter' || e.code === 'Space') {
                    handleRelease(note);
                }
            });
        });

        // Accessibility: Global listener for keyboard playing
        window.addEventListener('keydown', (e) => {
            if (keyToNoteMap.has(e.key)) {
                e.preventDefault();
                handlePress(keyToNoteMap.get(e.key), true);
            }
        });

        window.addEventListener('keyup', (e) => {
            if (keyToNoteMap.has(e.key)) {
                handleRelease(keyToNoteMap.get(e.key));
            }
        });
    }
});
