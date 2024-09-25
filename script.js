let score = 0;
let workerActive = false;
let workerCost = 50;
let workerInterval = null;
let workerPurchased = false;
let moreWorkersPurchased = 0;
let moreWorkersCost = 100;
let factoryPurchased = 0;
let factoryCost = 200;
let leafTrimmersPurchased = 0;
let leafTrimmersCost = 150; // Initial cost for Leaf Trimmers upgrade
let leafPointsPerClick = 1;
let factoryInterval = null;
let leafHarvestersPurchased = 0;
let leafHarvestersCost = 400; // Initial cost for Leaf Harvesters upgrade
let superFactoryPurchased = 0;
let superFactoryCost = 500; // Initial cost for Super Factory upgrade
let factoryPointsPerSecond = 5;
let superFactoryPointsPerSecond = 10;

// Function to update the score displayed on the page
function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
    localStorage.setItem('leafClickerScore', score);
    saveUpgrades();
}

// Function to save the upgrade states to local storage
function saveUpgrades() {
    const upgradesState = {
        workerPurchased,
        moreWorkersPurchased,
        moreWorkersCost,
        factoryPurchased,
        factoryCost,
        leafTrimmersPurchased,
        leafTrimmersCost,
        leafHarvestersPurchased,
        leafHarvestersCost,
        superFactoryPurchased,
        superFactoryCost
    };
    localStorage.setItem('leafClickerUpgrades', JSON.stringify(upgradesState));
}

// Load saved game state
window.onload = function() {
    const savedScore = localStorage.getItem('leafClickerScore');
    const savedUpgrades = localStorage.getItem('leafClickerUpgrades');

    if (savedScore) {
        score = parseInt(savedScore);
        updateScore();
    }

    if (savedUpgrades) {
        const upgradesState = JSON.parse(savedUpgrades);
        workerPurchased = upgradesState.workerPurchased;
        moreWorkersPurchased = upgradesState.moreWorkersPurchased;
        moreWorkersCost = upgradesState.moreWorkersCost;
        factoryPurchased = upgradesState.factoryPurchased;
        factoryCost = upgradesState.factoryCost;
        leafTrimmersPurchased = upgradesState.leafTrimmersPurchased;
        leafTrimmersCost = upgradesState.leafTrimmersCost;
        leafHarvestersPurchased = upgradesState.leafHarvestersPurchased;
        leafHarvestersCost = upgradesState.leafHarvestersCost;
        superFactoryPurchased = upgradesState.superFactoryPurchased;
        superFactoryCost = upgradesState.superFactoryCost;

        // Restore UI states based on saved upgrades
        updateUpgradeUI();
    }
};

// Function to update the UI for upgrades
function updateUpgradeUI() {
    if (workerPurchased) {
        document.getElementById('worker-status').innerText = "Worker: On";
        document.getElementById('worker-button').style.display = 'none';
        activateWorker();
    }
    if (moreWorkersPurchased > 0) {
        document.getElementById('more-workers-status').innerText = "Purchased: " + moreWorkersPurchased + " times";
        document.getElementById('more-workers-button').innerText = "Buy More Workers (Cost: " + moreWorkersCost + ")";
    }
    if (factoryPurchased > 0) {
        document.getElementById('factory-status').innerText = "Purchased: " + factoryPurchased + " times";
        document.getElementById('factory-button').innerText = "Buy Factory (Cost: " + factoryCost + ")";
        activateFactory();
    }
    if (leafTrimmersPurchased > 0) {
        document.getElementById('leaf-trimmers-status').innerText = "Purchased: " + leafTrimmersPurchased + " times";
        document.getElementById('leaf-trimmers-button').innerText = "Buy Leaf Trimmers (Cost: " + leafTrimmersCost + ")";
    }
    if (leafHarvestersPurchased > 0) {
        document.getElementById('leaf-harvesters-status').innerText = "Purchased: " + leafHarvestersPurchased + " times";
        document.getElementById('leaf-harvesters-button').innerText = "Buy Leaf Harvesters (Cost: " + leafHarvestersCost + ")";
    }
    if (superFactoryPurchased > 0) {
        document.getElementById('super-factory-status').innerText = "Purchased: " + superFactoryPurchased + " times";
        document.getElementById('super-factory-button').innerText = "Buy Super Factory (Cost: " + superFactoryCost + ")";
        activateSuperFactory();
    }
}

// Leaf click event listener
document.getElementById('clicker-image').addEventListener('click', function() {
    score += leafPointsPerClick;
    updateScore();
    this.classList.add('shake');

    setTimeout(() => {
        this.classList.remove('shake');
    }, 500);
});

// Function to activate worker
function activateWorker() {
    workerActive = true;
    const workerSpeed = 1000 - (moreWorkersPurchased * 200);
    workerInterval = setInterval(() => {
        score++;
        updateScore();
    }, workerSpeed);
}

// Buy Worker
document.getElementById('worker-button').addEventListener('click', function() {
    if (score >= workerCost && !workerPurchased) {
        score -= workerCost;
        workerPurchased = true;
        document.getElementById('worker-status').innerText = "Worker: On";
        this.style.display = 'none';
        activateWorker();
        updateScore();
    }
});

// Buy More Workers
document.getElementById('more-workers-button').addEventListener('click', function() {
    if (score >= moreWorkersCost) {
        score -= moreWorkersCost;
        moreWorkersPurchased++;
        moreWorkersCost = Math.floor(moreWorkersCost * 1.5); // Increase cost
        adjustWorkerSpeed(); // Adjust worker speed
        updateScore();
        document.getElementById('more-workers-status').innerText = "Purchased: " + moreWorkersPurchased + " times";
        this.innerText = "Buy More Workers (Cost: " + moreWorkersCost + ")"; // Update button text
    }
});

// Adjust worker speed
function adjustWorkerSpeed() {
    if (workerActive && workerInterval) {
        clearInterval(workerInterval);
        const workerSpeed = 1000 - (moreWorkersPurchased * 200);
        workerInterval = setInterval(() => {
            score++;
            updateScore();
        }, workerSpeed);
    }
}

// Buy Factory
document.getElementById('factory-button').addEventListener('click', function() {
    if (score >= factoryCost) {
        score -= factoryCost;
        factoryPurchased++;
        factoryCost = Math.floor(factoryCost * 1.5); // Increase cost
        updateScore();
        document.getElementById('factory-status').innerText = "Purchased: " + factoryPurchased + " times";
        this.innerText = "Buy Factory (Cost: " + factoryCost + ")"; // Update button text
        activateFactory(); // Activate factory if not already activated
    }
});

// Function to activate the factory
function activateFactory() {
    if (!factoryInterval) { // Check if factory is already activated
        factoryInterval = setInterval(() => {
            score += 5; // Add factory points
            updateScore();
        }, 1000); // Run every second
    }
}

// Buy Leaf Trimmers
document.getElementById('leaf-trimmers-button').addEventListener('click', function() {
    if (score >= leafTrimmersCost) {
        score -= leafTrimmersCost;
        leafTrimmersPurchased++;
        leafTrimmersCost = Math.floor(leafTrimmersCost * 1.5); // Increase cost
        updateScore();
        document.getElementById('leaf-trimmers-status').innerText = "Purchased: " + leafTrimmersPurchased + " times";
        this.innerText = "Buy Leaf Trimmers (Cost: " + leafTrimmersCost + ")"; // Update button text
    }
});

// Buy Leaf Harvesters
document.getElementById('leaf-harvesters-button').addEventListener('click', function() {
    if (score >= leafHarvestersCost) {
        score -= leafHarvestersCost;
        leafHarvestersPurchased++;
        leafHarvestersCost = Math.floor(leafHarvestersCost * 1.5); // Increase cost
        updateScore();
        document.getElementById('leaf-harvesters-status').innerText = "Purchased: " + leafHarvestersPurchased + " times";
        this.innerText = "Buy Leaf Harvesters (Cost: " + leafHarvestersCost + ")"; // Update button text
    }
});

// Buy Super Factory
document.getElementById('super-factory-button').addEventListener('click', function() {
    if (score >= superFactoryCost) {
        score -= superFactoryCost;
        superFactoryPurchased++;
        superFactoryCost = Math.floor(superFactoryCost * 1.5); // Increase cost
        updateScore();
        document.getElementById('super-factory-status').innerText = "Purchased: " + superFactoryPurchased + " times";
        this.innerText = "Buy Super Factory (Cost: " + superFactoryCost + ")"; // Update button text
        activateSuperFactory(); // Activate super factory
    }
});

// Function to activate Super Factory
function activateSuperFactory() {
    if (!factoryInterval) { // Check if super factory is already activated
        factoryInterval = setInterval(() => {
            score += superFactoryPointsPerSecond; // Add super factory points
            updateScore();
        }, 1000); // Run every second
    }
}
