const product = [
    {
        id: 201,
        image: 'tonkatsu.png',
        title: '&#128055;',
        title1: 'หมูชุบแป้งทอด',
        title2: 'Tonkatsu',
        price: 35,
    },
    {
        id: 202,
        image: 'teri_chick.png',
        title: '&#128020;',
        title1: 'ไก่เทอริยากิ',
        title2: 'Teriyaki',
        price: 35,
    },
    {
        id: 203,
        image: 'torikatsu.png',
        title: '&#128020;',
        title1: 'ไก่ชุบแป้งทอด',
        title2: 'Torikatsu',
        price: 30,
    },
    {
        id: 204,
        image: 'tempura.png',
        title: '&#129424',
        title1: 'กุ้งเทมปุระ',
        title2: 'Tempura',
        price: 35,
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

var main = null ;
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
            main = id;
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
        riceIDElement.innerHTML = main;
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

    function sendRiceToPHP(main) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
    
        // Prepare the data to be sent to the server
        var data = "rice=" + JSON.stringify(main); // Stringify the rice object
    
        // Configure the request
        xhr.open("POST", "recipe.php", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
        // Define the callback function when the request is complete
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Request was successful
                    console.log("Rice value sent to PHP successfully!");
                } else {
                    // Error handling
                    console.error("Error sending rice value to PHP:", xhr.statusText);
                }
            }
        }; // Close the if statement here
    
        // Send the request with the data
        xhr.send(data);
    }