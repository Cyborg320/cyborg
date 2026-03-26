// Functionality to save values to localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// Functionality to load values from localStorage on page load
function loadFromLocalStorage(key) {
    return localStorage.getItem(key);
}

// Functionality to auto-transfer sold amount to cash box
function transferSoldAmount(soldAmount, cashBox) {
    cashBox += soldAmount;
    return cashBox;
}

// Functionality to finalize the day's sales with one click
function finalizeSales() {
    alert("Sales have been finalized! Thank you!");
    // Additional code logic for finalizing sales can go here
}

// Example event listener for finalizing sales
document.getElementById('finalizeButton').addEventListener('click', finalizeSales);
// Load data from localStorage on page load
window.onload = function() {
    const savedValue = loadFromLocalStorage('someKey');
    // Do something with the saved value
};