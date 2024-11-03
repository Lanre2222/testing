let cart = [];
let totalPrice = 0;

fetch('data.json')
    .then(response => response.json())
    .then(productsData => {
        displayProducts(productsData);
    })
    .catch(error => {
        console.error('Error fetching the product data:', error);
    });


function displayProducts(products) {
    const productContainer = document.getElementById('product-cart');
    productContainer.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('products');
        productDiv.innerHTML = `
            <img src="${product.image.thumbnail}" alt="${product.name}" id="productImgs">
            <h2>${product.name}</h2>
            <p id="price">$${product.price.toFixed(2)}</p>
            <button class="addToCart" onclick="addToCart(${index})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}


function addToCart(productIndex) {
    fetch('data.json')
        .then(response => response.json())
        .then(productsData => {
            const product = productsData[productIndex];
            const existingProduct = cart.find(item => item.name === product.name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            totalPrice += product.price;
            updateCartDisplay();
        })
        .catch(error => {
            console.error('Error fetching the product data:', error);
        });
}


function removeFromCart(productIndex) {
    const product = cart[productIndex];
    totalPrice -= product.price * product.quantity;
    cart.splice(productIndex, 1);
    updateCartDisplay();
}


function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');


    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);


    cartItemsList.innerHTML = '';


    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
    });


    totalPriceElement.textContent = totalPrice.toFixed(2);
}

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    totalPrice = 0;
    updateCartDisplay();
});
