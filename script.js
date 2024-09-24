let score = 0;
let autoClickerCost = 10;
let multiplierCost = 20;
let workersCost = 50;
let speedUpgradeCost = 100; // Cost for the speed upgrade
let autoClickerActive = false;
let pointsPerClick = 1;
let autoClickers = 0;
let workers = 0;
let hasClickedOnce = false;
let autoClickInterval = 1000; // Base interval for auto clickers

document.addEventListener('DOMContentLoaded', () => {
    loadGame();

    document.getElementById('clickLeaf').addEventListener('click', function() {
        this.classList.add('shake');
        setTimeout(() => {
            this.classList.remove('shake');
        }, 300);

        score += pointsPerClick;
        document.getElementById('score').innerText = 'Score: ' + score;
        showPopUp(event.clientX, event.clientY, pointsPerClick);
        updateUpgradeButtons();

        if (!hasClickedOnce) {
            hasClickedOnce = true;
            document.getElementById('achievementMessage').innerText = 'You have one Leaf!';
        }
        
        saveGame();
    });

    document.getElementById('autoClickerButton').addEventListener('click', function() {
        this.classList.add('pop');
        setTimeout(() => {
            this.classList.remove('pop');
        }, 200); 

        if (score >= autoClickerCost) {
            score -= autoClickerCost;
            autoClickerActive = true;
            autoClickers++;
            document.getElementById('score').innerText = 'Score: ' + score;
            document.getElementById('upgradeMessage').innerText = 'Auto Clicker Purchased! You now have ' + autoClickers + ' auto clicker(s).';
            startAutoClick();
            increaseAutoClickerCost();
        } else {
            document.getElementById('upgradeMessage').innerText = 'Not enough points!';
        }
        
        saveGame();
    });

    document.getElementById('multiplierButton').addEventListener('click', function() {
        this.classList.add('pop');
        setTimeout(() => {
            this.classList.remove('pop');
        }, 200); 

        if (score >= multiplierCost) {
            score -= multiplierCost;
            pointsPerClick += 1;
            document.getElementById('score').innerText = 'Score: ' + score;
            document.getElementById('upgradeMessage').innerText = 'Leaf Multiplier Purchased! Points per click: ' + pointsPerClick;
            increaseMultiplierCost();
        } else {
            document.getElementById('upgradeMessage').innerText = 'Not enough points!';
        }
        
        saveGame();
    });

    document.getElementById('workersButton').addEventListener('click', function() {
        this.classList.add('pop');
        setTimeout(() => {
            this.classList.remove('pop');
        }, 200); 

        if (score >= workersCost) {
            score -= workersCost;
            workers++;
            document.getElementById('score').innerText = 'Score: ' + score;
            document.getElementById('upgradeMessage').innerText = 'Worker Purchased! You now have ' + workers + ' worker(s).';
            increaseWorkersCost();
        } else {
            document.getElementById('upgradeMessage').innerText = 'Not enough points!';
        }
        
        saveGame();
    });

    document.getElementById('speedButton').addEventListener('click', function() {
        this.classList.add('pop');
        setTimeout(() => {
            this.classList.remove('pop');
        }, 200);

        if (score >= speedUpgradeCost) {
            score -= speedUpgradeCost;
            autoClickInterval = Math.max(500, autoClickInterval - 200); // Reduce interval, minimum 500ms
            document.getElementById('score').innerText = 'Score: ' + score;
            document.getElementById('upgradeMessage').innerText = 'Faster Auto Clickers Purchased! Current interval: ' + (autoClickInterval / 1000) + ' seconds.';
            increaseSpeedUpgradeCost();
            clearInterval(); // Clear the previous interval
            startAutoClick(); // Restart auto clickers with the new interval
        } else {
            document.getElementById('upgradeMessage').innerText = 'Not enough points!';
        }
        
        saveGame();
    });
});

function startAutoClick() {
    setInterval(() => {
        if (autoClickerActive) {
            score += autoClickers;
            score += workers * 4;
            document.getElementById('score').innerText = 'Score: ' + score;
            showPopUp(event.clientX, event.clientY, autoClickers + (workers * 4)); 
            saveGame();
        }
    }, autoClickInterval);
}

function increaseAutoClickerCost() {
    autoClickerCost = Math.floor(autoClickerCost * 1.5);
    document.getElementById('autoClickerButton').innerText = `Auto Clicker (Cost: ${autoClickerCost} Points)`;
}

function increaseMultiplierCost() {
    multiplierCost = Math.floor(multiplierCost * 1.5);
    document.getElementById('multiplierButton').innerText = `Leaf Multiplier (Cost: ${multiplierCost} Points)`;
}

function increaseWorkersCost() {
    workersCost = Math.floor(workersCost * 1.5);
    document.getElementById('workersButton').innerText = `Workers (Cost: ${workersCost} Points)`;
}

function increaseSpeedUpgradeCost() {
    speedUpgradeCost = Math.floor(speedUpgradeCost * 1.5);
    document.getElementById('speedButton').innerText = `Faster Auto Clickers (Cost: ${speedUpgradeCost} Points)`;
}

function updateUpgradeButtons() {
    if (score >= autoClickerCost || autoClickerCost === 10) {
        document.getElementById('autoClickerButton').style.display = 'block';
    }

    if (score >= multiplierCost || multiplierCost === 20) {
        document.getElementById('multiplierButton').style.display = 'block';
    }

    if (score >= workersCost || workersCost === 50) {
        document.getElementById('workersButton').style.display = 'block';
    }

    if (score >= speedUpgradeCost || speedUpgradeCost === 100) {
        document.getElementById('speedButton').style.display = 'block';
    }
}

function showPopUp(x, y, points) {
    const popUp = document.createElement('div');
    popUp.className = 'pop-up';
    popUp.innerText = `+${points}`;
    popUp.style.left = `${x}px`;
    popUp.style.top = `${y - 30}px`; 
    document.body.appendChild(popUp);
    setTimeout(() => {
        popUp.style.transform = 'translateY(-20px)';
        popUp.style.opacity = '0';
    }, 10);
    setTimeout(() => {
        document.body.removeChild(popUp);
    }, 510);
}

// Save the game state to localStorage
function saveGame() {
    const gameState = {
        score,
        autoClickerCost,
        multiplierCost,
        workersCost,
        speedUpgradeCost, // Add speed upgrade cost
        pointsPerClick,
        autoClickers,
        workers,
        hasClickedOnce,
        autoClickInterval // Save the interval
    };
    localStorage.setItem('leafClickerGame', JSON.stringify(gameState));
}

// Load the game state from localStorage
function loadGame() {
    const savedGame = localStorage.getItem('leafClickerGame');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        score = gameState.score;
        autoClickerCost = gameState.autoClickerCost;
        multiplierCost = gameState.multiplierCost;
        workersCost = gameState.workersCost;
        speedUpgradeCost = gameState.speedUpgradeCost; // Load speed upgrade cost
        pointsPerClick = gameState.pointsPerClick;
        autoClickers = gameState.autoClickers;
        workers = gameState.workers;
        hasClickedOnce = gameState.hasClickedOnce;
        autoClickInterval = gameState.autoClickInterval; // Load interval

        document.getElementById('score').innerText = 'Score: ' + score;
        document.getElementById('autoClickerButton').innerText = `Auto Clicker (Cost: ${autoClickerCost} Points)`;
        document.getElementById('multiplierButton').innerText = `Leaf Multiplier (Cost: ${multiplierCost} Points)`;
        document.getElementById('workersButton').innerText = `Workers (Cost: ${workersCost} Points)`;
        document.getElementById('speedButton').innerText = `Faster Auto Clickers (Cost: ${speedUpgradeCost} Points)`; // Set button text
        updateUpgradeButtons(); 
    }
}
