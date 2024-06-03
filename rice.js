
const product = [
    {
        id: 103,
        image: 'rice1.png',
        title: '&#127834;',
        title1: 'ข้าวญี่ปุ่น',
        title2: 'Japanese Rice',
        price: 30,
    },
    {
        id: 102,
        image: 'rs.png',
        title: '&#127834; + &#129716',
        title1: 'ข้าว+สาหร่าย',
        title2: 'Rice + Seaweed',
        price: 25,
    },
    {
        id: 101,
        image: 'onigiri.png',
        title: '&#127833;',
        title1: 'ข้าวปั้นสาหร่าย ',
        title2: 'Onigiri',
        price: 20,
    },
    {
        id: 104,
        image: 'fried_rice.png',
        title: '&#127834; + &#128055;',
        title1: 'ข้าวผัด',
        title2: 'Fried Rice',
        price: 25,
    }
];

const session = require('express-session')
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session = require('express-session')


//var index = <?= json_encode($riceData)?>;
let i = 0;
document.getElementById('root').innerHTML = product.map((item, index) => {
    const { image, title,title1,title2, price,id } = item;
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
                <button onclick='addtocart(${index})' value ='${id}'>Add to cart</button>
            </div>
        </div>`
    );
}).join('');

var rice = '';
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
            rice = id;
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
        riceIDElement.innerHTML = rice;
        sendRiceToPHP(rice);
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

    function sendRiceToPHP(rice) {
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
    
        // Prepare the data to be sent to the server
        var data = "rice=" + JSON.stringify(rice); // Stringify the rice object
    
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
    