let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let upgradeCost = localStorage.getItem('upgradeCost') ? parseInt(localStorage.getItem('upgradeCost')) : 10;
let clickMultiplier = localStorage.getItem('clickMultiplier') ? parseInt(localStorage.getItem('clickMultiplier')) : 1;
let autoClickerCost = localStorage.getItem('autoClickerCost') ? parseInt(localStorage.getItem('autoClickerCost')) : 50;
let autoClickers = localStorage.getItem('autoClickers') ? parseInt(localStorage.getItem('autoClickers')) : 0;
let autoClickInterval;
let autoClickSpeed = 1000; // Default auto-click interval (1 second)
let scoreMultiplier = 1; // For score multiplication

const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const upgradeButton = document.getElementById('upgrade-button');
const doubleMultiplierButton = document.getElementById('double-multiplier-button');
const increaseClickValueButton = document.getElementById('increase-click-value-button');
const scoreMultiplicationButton = document.getElementById('score-multiplication-button');
const fasterAutoButton = document.getElementById('faster-auto-button');
const scoreBoostButton = document.getElementById('score-boost-button');
const autoClickerButton = document.getElementById('auto-clicker-button');
const upgradeStatus = document.getElementById('upgrade-status');
const autoClickerStatus = document.getElementById('auto-clicker-status');
const tripleClickButton = document.getElementById('triple-click-button');
const megaAutoButton = document.getElementById('mega-auto-button');
const timeFreezeButton = document.getElementById('time-freeze-button');
const scoreBoosterButton = document.getElementById('score-booster-button');
const unlockDoubleButton = document.getElementById('unlock-double-button');
const instantUpgradeButton = document.getElementById('instant-upgrade-button');
const luckyClickButton = document.getElementById('lucky-click-button');

// Save function
function saveGame() {
    localStorage.setItem('score', score);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('autoClickerCost', autoClickerCost);
    localStorage.setItem('autoClickers', autoClickers);
}

// Load function
function loadGame() {
    scoreDisplay.textContent = `Score: ${score}`;
    upgradeStatus.textContent = `Current Multiplier: ${clickMultiplier}`;
    autoClickerStatus.textContent = `Auto Clickers: ${autoClickers}`;
    upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost})`;
    autoClickerButton.textContent = `Buy Auto Clicker (Cost: ${autoClickerCost})`;
}

// Load saved game on page load
loadGame();

clickButton.addEventListener('click', () => {
    score += clickMultiplier * scoreMultiplier;
    scoreDisplay.textContent = `Score: ${score}`;
    saveGame(); // Save game state after clicking
});

upgradeButton.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost; // Deduct cost
        clickMultiplier++; // Increase the multiplier
        upgradeCost = Math.floor(upgradeCost * 1.5); // Increase cost for next upgrade
        updateUpgradeStatus();
        scoreDisplay.textContent = `Score: ${score}`;
        upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost})`;
        alert("You've upgraded your click multiplier!");
        saveGame(); // Save game state after upgrading
    } else {
        alert("Not enough points for upgrade!");
    }
});

// Double click multiplier logic
doubleMultiplierButton.addEventListener('click', () => {
    if (score >= 100) {
        score -= 100; // Deduct cost
        clickMultiplier *= 2; // Double the multiplier
        scoreDisplay.textContent = `Score: ${score}`;
        alert("Your click multiplier has been doubled!");
        saveGame(); // Save game state after doubling
    } else {
        alert("Not enough points for double click multiplier!");
    }
});

// Increase click value
increaseClickValueButton.addEventListener('click', () => {
    if (score >= 150) {
        score -= 150; // Deduct cost
        clickMultiplier += 5; // Increase click value by 5
        scoreDisplay.textContent = `Score: ${score}`;
        alert("You've increased your click value by 5!");
        saveGame(); // Save game state after increasing click value
    } else {
        alert("Not enough points for this upgrade!");
    }
});

// Score multiplication
scoreMultiplicationButton.addEventListener('click', () => {
    if (score >= 300) {
        score -= 300; // Deduct cost
        scoreMultiplier = 1.5; // Set score multiplier
        scoreDisplay.textContent = `Score: ${score}`;
        alert("Your score will now be multiplied by 1.5!");
        saveGame(); // Save game state after score multiplication
    } else {
        alert("Not enough points for score multiplication!");
    }
});

// Faster auto-clicker logic
fasterAutoButton.addEventListener('click', () => {
    if (score >= 200) {
        score -= 200; // Deduct cost
        autoClickSpeed = Math.max(500, autoClickSpeed - 200); // Decrease interval (minimum 500ms)
        clearInterval(autoClickInterval); // Clear existing interval
        autoClickInterval = setInterval(() => {
            score += clickMultiplier * scoreMultiplier; // Add score based on clickMultiplier
            scoreDisplay.textContent = `Score: ${score}`;
        }, autoClickSpeed); // New auto-click speed
        alert("Your auto clickers are now faster!");
        saveGame(); // Save game state after upgrading speed
    } else {
        alert("Not enough points for faster auto clickers!");
    }
});

// Score boost logic
scoreBoostButton.addEventListener('click', () => {
    if (score >= 150) {
        score -= 150; // Deduct cost
        score += 500; // Add a flat score boost
        scoreDisplay.textContent = `Score: ${score}`;
        alert("You've received a score boost!");
        saveGame(); // Save game state after score boost
    } else {
        alert("Not enough points for a score boost!");
    }
});

// Auto-clicker logic
autoClickerButton.addEventListener('click', () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost; // Deduct cost
        autoClickers++; // Increase number of auto-clickers
        autoClickerCost = Math.floor(autoClickerCost * 1.5); // Increase cost for next auto-clicker

        if (!autoClickInterval) {
            autoClickInterval = setInterval(() => {
                score += clickMultiplier * scoreMultiplier; // Add score based on clickMultiplier
                scoreDisplay.textContent = `Score: ${score}`;
            }, autoClickSpeed); // Auto-click with current speed
        }

        updateAutoClickerStatus();
        scoreDisplay.textContent = `Score: ${score}`;
        autoClickerButton.textContent = `Buy Auto Clicker (Cost: ${autoClickerCost})`;
        alert("You've purchased an auto clicker!");
        saveGame(); // Save game state after purchasing an auto clicker
    } else {
        alert("Not enough points for auto clicker!");
    }
});

// New Upgrades
tripleClickButton.addEventListener('click', () => {
    if (score >= 300) {
        score -= 300; // Deduct cost
        clickMultiplier *= 3; // Triple the multiplier
        scoreDisplay.textContent = `Score: ${score}`;
        alert("Your click multiplier has been tripled!");
        saveGame(); // Save game state after upgrade
    } else {
        alert("Not enough points for triple click multiplier!");
    }
});

megaAutoButton.addEventListener('click', () => {
    if (score >= 500) {
        score -= 500; // Deduct cost
        autoClickers++; // Increase number of auto-clickers
        scoreDisplay.textContent = `Score: ${score}`;
        alert("You've purchased a Mega Auto Clicker!");
        saveGame(); // Save game state after purchase
    } else {
        alert("Not enough points for Mega Auto Clicker!");
    }
});

timeFreezeButton.addEventListener('click', () => {
    if (score >= 600) {
        score -= 600; // Deduct cost
        let originalAutoClickSpeed = autoClickSpeed;
        autoClickSpeed = 10000; // Set high delay for freezing effect
        clearInterval(autoClickInterval);
        autoClickInterval = setInterval(() => {
            score += clickMultiplier * scoreMultiplier; // Add score
            scoreDisplay.textContent = `Score: ${score}`;
        }, autoClickSpeed);

        setTimeout(() => {
            autoClickSpeed = originalAutoClickSpeed; // Reset speed after 10 seconds
            clearInterval(autoClickInterval);
            autoClickInterval = setInterval(() => {
                score += clickMultiplier * scoreMultiplier;
                scoreDisplay.textContent = `Score: ${score}`;
            }, autoClickSpeed);
        }, 10000);
        
        alert("Time has been frozen for 10 seconds!");
        saveGame(); // Save game state after time freeze
    } else {
        alert("Not enough points for Time Freeze!");
    }
});

scoreBoosterButton.addEventListener('click', () => {
    if (score >= 250) {
        score -= 250; // Deduct cost
        score += 1000; // Boost score
        scoreDisplay.textContent = `Score: ${score}`;
        alert("You've received a score boost of 1000 points!");
        saveGame(); // Save game state after boost
    } else {
        alert("Not enough points for Score Booster!");
    }
});

unlockDoubleButton.addEventListener('click', () => {
    if (score >= 700) {
        score -= 700; // Deduct cost
        autoClickerCost = Math.floor(autoClickerCost / 2); // Decrease cost for double auto clickers
        scoreDisplay.textContent = `Score: ${score}`;
        alert("You can now buy double auto clickers at a discount!");
        saveGame(); // Save game state after unlocking
    } else {
        alert("Not enough points to unlock double auto clickers!");
    }
});

instantUpgradeButton.addEventListener('click', () => {
    if (score >= 800) {
        score -= 800; // Deduct cost
        clickMultiplier += 2; // Instant upgrade
        scoreDisplay.textContent = `Score: ${score}`;
        alert("You've received an instant upgrade!");
        saveGame(); // Save game state after instant upgrade
    } else {
        alert("Not enough points for Instant Upgrade!");
    }
});

luckyClickButton.addEventListener('click', () => {
    if (score >= 400) {
        score -= 400; // Deduct cost
        const bonus = Math.floor(Math.random() * 151) + 50; // Random bonus between 50 and 200
        score += bonus;
        scoreDisplay.textContent = `Score: ${score}`;
        alert(`Lucky Click! You've received a bonus of ${bonus} points!`);
        saveGame(); // Save game state after lucky click
    } else {
        alert("Not enough points for Lucky Click!");
    }
});

function updateUpgradeStatus() {
    upgradeStatus.textContent = `Current Multiplier: ${clickMultiplier}`;
}

function updateAutoClickerStatus() {
    autoClickerStatus.textContent = `Auto Clickers: ${autoClickers}`;
}

// Initialize display
loadGame();
