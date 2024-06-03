// Function to save the cart data to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to retrieve the cart data from local storage
function retrieveCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        displaycart(); // Update the cart display with the retrieved data
    }
}

// Call the retrieveCartFromLocalStorage function when the window loads
window.onload = function() {
    retrieveCartFromLocalStorage();
};

// Function to add a product to the cart
function addtocart(index) {
    cart.push({ ...product[index] });
    saveCartToLocalStorage(); // Save the updated cart data to local storage
    displaycart(); // Update the cart display
}

// Function to remove a product from the cart
function delElement(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage(); // Save the updated cart data to local storage
    displaycart(); // Update the cart display
}

function sendID(index) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        displaycart(); // Update the cart display with the retrieved data
    }
}
