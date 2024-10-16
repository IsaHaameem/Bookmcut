document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    let totalPrice = 0;

    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Helper function to format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }

    // Function to update cart display
    function updateCartDisplay() {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${formatCurrency(item.price)}`;
            cartItemsElement.appendChild(listItem);
        });
        cartCountElement.textContent = cart.length;
        totalPriceElement.textContent = totalPrice;
    }

    // Function to handle Add to Cart action
    function addToCart(serviceName, servicePrice, addBtn, removeBtn) {
        // Add service to cart
        const item = { name: serviceName, price: servicePrice };
        cart.push(item);
        totalPrice += servicePrice;

        // Hide Add button, show Remove button
        addBtn.style.display = 'none';
        removeBtn.style.display = 'inline';

        // Update cart display
        updateCartDisplay();
    }

    // Function to handle Remove from Cart action
    function removeFromCart(serviceName, servicePrice, addBtn, removeBtn) {
        // Find and remove the item from the cart
        const itemIndex = cart.findIndex(item => item.name === serviceName);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            totalPrice -= servicePrice;
        }

        // Hide Remove button, show Add button
        addBtn.style.display = 'inline';
        removeBtn.style.display = 'none';

        // Update cart display
        updateCartDisplay();
    }

    // Attach event listeners to service buttons
    document.querySelectorAll('.add-to-cart').forEach(addBtn => {
        const serviceName = addBtn.dataset.service;
        const servicePrice = parseInt(addBtn.dataset.price, 10);
        const removeBtn = addBtn.nextElementSibling;

        addBtn.addEventListener('click', function () {
            addToCart(serviceName, servicePrice, addBtn, removeBtn);
        });

        removeBtn.addEventListener('click', function () {
            removeFromCart(serviceName, servicePrice, addBtn, removeBtn);
        });
    });

    // Checkout button click event
    checkoutBtn.addEventListener('click', function () {
        if (cart.length > 0) {
            // Store cart details and total price in localStorage for the checkout page
            localStorage.setItem('cartItems', JSON.stringify(cart));
            localStorage.setItem('totalPrice', totalPrice);

            // Redirect to the checkout page
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty. Please add some services.');
        }
    });
});
