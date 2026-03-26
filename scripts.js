// Function to save and load from localStorage
function saveToLocal() {
    const products = [...document.querySelectorAll('.product')].map(product => ({
        price: product.querySelector('.price').value,
        quantity: product.querySelector('.quantity').value
    }));
    localStorage.setItem('products', JSON.stringify(products));
}

function loadFromLocal() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach((product, index) => {
        const priceInput = document.querySelector(`.product:nth-child(${index + 1}) .price`);
        const quantityInput = document.querySelector(`.product:nth-child(${index + 1}) .quantity`);
        priceInput.value = product.price;
        quantityInput.value = product.quantity;
    });
}

// Function to transfer daily sales to cash box
function transferToCashBox() {
    const cashBox = document.getElementById('cash-box');
    const totalSales = [...document.querySelectorAll('.product')].reduce((total, product) => {
        const price = parseFloat(product.querySelector('.price').value) || 0;
        const quantity = parseInt(product.querySelector('.quantity').value) || 0;
        return total + (price * quantity);
    }, 0);
    cashBox.value = parseFloat(cashBox.value) + totalSales;
}

// Function to finalize the day
function finalizeDay() {
    const cashBox = document.getElementById('cash-box');
    const totalSales = [...document.querySelectorAll('.product')].reduce((total, product) => {
        const price = parseFloat(product.querySelector('.price').value) || 0;
        const quantity = parseInt(product.querySelector('.quantity').value) || 0;
        return total + (price * quantity);
    }, 0);
    cashBox.value = parseFloat(cashBox.value) + totalSales;
    clearProductInputs();
    localStorage.removeItem('products');
}

function clearProductInputs() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.querySelector('.price').value = '';
        product.querySelector('.quantity').value = '';
    });
}

// Event listeners for auto-saving
document.querySelectorAll('.product .price, .product .quantity').forEach(input => {
    input.addEventListener('change', saveToLocal);
});

// Load localStorage when the page loads
window.onload = loadFromLocal;

// Finalize day button listener
document.getElementById('finalize-button').addEventListener('click', finalizeDay);