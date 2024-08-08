// This will store cart items
const cart = {};

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product button');
    const cartItemsList = document.getElementById('cart-items');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productName = event.target.dataset.productName;
            const productPrice = parseFloat(event.target.dataset.productPrice);
            addToCart(productName, productPrice);
            updateCartUI();
        });
    });

    function addToCart(productName, productPrice) {
        if (!cart[productName]) {
            cart[productName] = { price: productPrice, quantity: 1 };
        } else {
            cart[productName].quantity += 1;
        }
    }

    function removeFromCart(productName) {
        delete cart[productName];
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsList.innerHTML = '';

        for (const [productName, productDetails] of Object.entries(cart)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${productName} - $${productDetails.price.toFixed(2)} x ${productDetails.quantity}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(productName);
            });
            listItem.appendChild(removeButton);
            cartItemsList.appendChild(listItem);
        }
    }
});




