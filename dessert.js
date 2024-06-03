const product = [
    {
        id: 501,
        image: 'dango.png',
        title: '&#128055;',
        title1: 'ดังโงะ',
        title2: 'Dango',
        price: 15,
    },
    {
        id: 502,
        image: 'mochi.png',
        title: '&#128020;',
        title1: 'โมจิ',
        title2: 'Mochi',
        price: 20,
    },
    {
        id: 503,
        image: 'pudding.png',
        title: '&#128020;',
        title1: 'พุดดิ้ง',
        title2: 'Pudding',
        price: 25,
    },
    {
        id: 504,
        image: 'castella.png',
        title: '&#129424',
        title1: 'คัสเตลลา',
        title2: 'Castella',
        price: 25,
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

var dessert = null ;
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
            dessert = id;
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
        riceIDElement.innerHTML = dessert;
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

    function sendDessertToPHP(dessert) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
    
        // Prepare the data to be sent to the server
        var data = new FormData();
        data.append('dessert', dessert);
    
        // Configure the request
        xhr.open("POST", "recipe.php", true);
    
        // Define the callback function when the request is complete
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Request was successful
                console.log("Dessert value sent to PHP successfully!");
            } else {
                // Error handling
                console.error("Error sending dessert value to PHP:", xhr.statusText);
            }
        };
    
        // Send the request with the data
        xhr.send(data);
    }