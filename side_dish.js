const product = [
    {
        id: 301,
        image: 'seaweed_salad.png',
        title: '&#128055;',
        title1: 'ยำสาหร่าย',
        title2: 'Seaweed Salad',
        price: 30,
    },
    {
        id: 302,
        image: 'kimchi.png',
        title: '&#128020;',
        title1: 'กิมจิ',
        title2: 'Kimchi',
        price: 15,
    },
    {
        id: 303,
        image: 'radish.png',
        title: '&#128020;',
        title1: 'ไชเท้าดอง',
        title2: 'Picked Radish',
        price: 15,
    },
    {
        id: 304,
        image: 'sw_sesame.png',
        title: '&#129424',
        title1: 'ผักโขมคลุกน้ำมันงา',
        title2: 'spinach sesame oil',
        price: 15,
    }
];
let i = 0;
document.getElementById('root').innerHTML = product.map((item, index) => {
    const { image, title,title1,title2, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <p>${title1}</p>
                <p>${title2}</p>
                <h2>฿ ${price}.00</h2>
                <button onclick='addtocart(${index})'>Add to cart</button>
            </div>
        </div>`
    );
}).join('');

var side_dish = null ;
var cart = [];

function addtocart(index) {
    cart.push({ ...product[index] });
    displaycart();
}

function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}

function displaycart() {
    let total = 0;
    const cartItemElement = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
    const riceIDElement = document.getElementById("riceID");
    const confirmButtonElement = document.getElementById("confirmButton");

    if (cart.length === 0) {
        cartItemElement.innerHTML = "Your cart is empty";
        totalElement.innerHTML = "฿ 0.00";
        confirmButtonElement.style.display = "none";
    } else {
        cartItemElement.innerHTML = cart.map((item, index) => {
            const { image, title,title1,title2, price,id } = item;
            total += price;
            side_dish = id;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:15px;'>${title}</p>
                    <p style='font-size:15px;'>${title1}</p>
                    <p style='font-size:15px;'>${title2}</p>
                    <h2 style='font-size: 15px;'>฿ ${price}.00</h2>
                    <i class='bx bxs-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');

        totalElement.innerHTML = "฿ " + total.toFixed(2);
        confirmButtonElement.style.display = "block";
        riceIDElement.innerHTML = side_dish;
    }
}


    window.onload = function() {
        retrieveCartFromLocalStorage();

    const confirmButtonElement = document.createElement("button");
    confirmButtonElement.textContent = "Confirm Order";
    confirmButtonElement.onclick = confirmOrder;
    confirmButtonElement.id = "confirmButton";
    document.getElementById("root").appendChild(confirmButtonElement);
    displaycart();
    };