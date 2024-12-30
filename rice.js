const product = [
    { id: 103, image: 'rice1.png', title: '&#127834;', title1: 'ข้าวญี่ปุ่น', title2: 'Japanese Rice', price: 30 },
    { id: 102, image: 'rs.png', title: '&#127834; + &#129716', title1: 'ข้าว+สาหร่าย', title2: 'Rice + Seaweed', price: 25 },
    { id: 101, image: 'onigiri.png', title: '&#127833;', title1: 'ข้าวปั้นสาหร่าย', title2: 'Onigiri', price: 20 },
    { id: 104, image: 'fried_rice.png', title: '&#127834; + &#128055;', title1: 'ข้าวผัด', title2: 'Fried Rice', price: 25 }
];

let cart = [];

// Render Products
document.getElementById('root').innerHTML = product.map((item, index) => {
    const { image, title, title1, title2, price } = item;
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src=${image} alt='Product Image'>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <p>${title1}</p>
                <p>${title2}</p>
                <h2>฿ ${price}.00</h2>
                <button onclick='addtocart(${index})'>Add to cart</button>
            </div>
        </div>`;
}).join('');

// Add to Cart
function addtocart(index) {
    cart.push({ ...product[index] });
    displaycart();
}

// Delete from Cart
function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}

// Display Cart
function displaycart() {
    let total = 0;
    const cartItemElement = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
    const confirmButtonElement = document.getElementById("confirmButton");

    if (cart.length === 0) {
        cartItemElement.innerHTML = "Your cart is empty";
        totalElement.innerHTML = "฿ 0.00";
        confirmButtonElement.style.display = "none";
    } else {
        cartItemElement.innerHTML = cart.map((item, index) => {
            const { image, title, title1, title2, price } = item;
            total += price;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image} alt='Cart Item'>
                    </div>
                    <p style='font-size:15px;'>${title}</p>
                    <p style='font-size:15px;'>${title1}</p>
                    <p style='font-size:15px;'>${title2}</p>
                    <h2 style='font-size:15px;'>฿ ${price}.00</h2>
                    <i class='bx bxs-trash' onclick='delElement(${index})'></i>
                </div>`;
        }).join('');

        totalElement.innerHTML = "฿ " + total.toFixed(2);
        confirmButtonElement.style.display = "block";
    }
}

// Send Data to PHP
function sendRiceToPHP() {
    const xhr = new XMLHttpRequest();
    const data = "cart=" + JSON.stringify(cart);

    xhr.open("POST", "recipe.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Cart data sent to PHP successfully!");
            } else {
                console.error("Error sending cart data:", xhr.statusText);
            }
        }
    };

    xhr.send(data);
}

// Confirm Order
function confirmOrder() {
    sendRiceToPHP();
    alert("Order confirmed!");
    cart = [];
    displaycart();
}

// Add Confirm Order Button
window.onload = function () {
    const confirmButtonElement = document.createElement("button");
    confirmButtonElement.textContent = "Confirm Order";
    confirmButtonElement.id = "confirmButton";
    confirmButtonElement.onclick = confirmOrder;
    confirmButtonElement.style.display = "none";
    document.body.appendChild(confirmButtonElement);
    displaycart();
};
