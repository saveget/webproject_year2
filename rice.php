<?php
require 'productConnection.php';

// Check if the form is submitted
if($_SERVER["REQUEST_METHOD"] === "POST") {
    // If the "confirm" button is clicked
    if(isset($_POST["confirm"])) {
        // Update the orders table
        $query2 = "UPDATE Orders SET status_served = 'No'";
        $query3 = "UPDATE Orders SET status_pay = 'No'";
        mysqli_query($conn, $query2);
        mysqli_query($conn, $query3);

        // Insert rice into the orders table
        $rice = $_POST["rice"];
        $query = "INSERT INTO Orders(order_id, riceID, main_courseID, side_dishesID, snacksID, dessertID, total_price, status_pay, status_served)
                  VALUES ('', '$rice', '', '', '', '', '0', 'No', 'No')";
        mysqli_query($conn, $query);

        // Display success message
        echo "<script> alert('DESSERT Inserted Successfully'); </script>";
    } else {
        echo "No dessert value received";
    }
}
?>

<script>
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
                <button onclick='addtocart(${index})'>Add to cart</button>
            </div>
        </div>`
    );
}).join('');

var rice = null;
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
        var data = new FormData();
        data.append('rice', rice);
    
        // Configure the request
        xhr.open("POST", "recipe.php", true);
    
        // Define the callback function when the request is complete
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Request was successful
                console.log("Rice value sent to PHP successfully!");
            } else {
                // Error handling
                console.error("Error sending rice value to PHP:", xhr.statusText);
            }
        };
    
        // Send the request with the data
        xhr.send(data);
    }
</script>

<!DOCTYPE html>
<html lang=“th”>


<head>
    <title>Kuronuma Bento</title>
    <link rel="stylesheet" href="style_rice.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+Thai:wght@100..900&display=swap"
        rel="stylesheet">
        <style>
            /* CSS to change the color of the text */
            #rice,#icon_rice {
                color: rgb(0, 5, 90);
            }
            #cf_order{
                color: #ffffff;
                font-size: 20px;
            }

        </style>
</head>

<body>
    <section class="header">
        <nav>
            <a href="index.html"><img src="logo.png" class="logo"></a>
            <div class="nav-links">
                <p class="language">
                    Chang Language&nbsp=>&nbsp<a href="#" language="Thai" class="active"
                        onclick="changeLanguage('Thai')">Thai</a>&nbsp
                    &nbsp<a href="#" language="Eng" id="eng" onclick="changeLanguage('Eng')">Eng</a>
                </p>
                <br>
                <ul>
                    <li class="home"><a href="index.html" id="home">หน้าหลัก</a></li>
                    <li class="pro"><a href="" id="pro">โปรโมชั่น</a></li>
                    <li class="recomment"><a href="" id="rec">เมนูแนะนำ</a></li>
                    <li class="contact"><a href="" id="contact">ติดต่อเรา</a></li>
                </ul>
            </div>
        </nav>
    </section>

    <section class="body_main">
        <div class="topic">
        </div>
        <div class="menu">
            <ul>
                <li class=""><a href="rice.html"><i class='bx bxs-bowl-rice' id="icon_rice"></i><br><span id="rice">ข้าว</span></a></li>
                <li class=""><a href="main.html"><i class='bx bx-dish'></i><br><span id="main">จานหลัก</span></a></li>
                <li class=""><a href="appi.html"><i class='bx bx-cheese'></i><br><span id="appi">อาหารทานเล่น</span></a></li>
                <li class=""><a href="side_dish.html"><i class='bx bx-sushi'></i><br><span id="side_dishes">เครื่องเคียง</span></a></li>
                <li class=""><a href="dessert.html"><i class='bx bxs-popsicle'></i><br><span id="dessert">ของหวาน</span></a></li>
            </ul>
        </div>
        <center>
            <br>
            <h1 id="choose_r">CHOOSE YOUR RICE</h1>
            <br>
            <div class="container">
                <div id="root"></div>
                <div class="sidebar">
                    <div class="head" id="headcart">
                        <p>My Bento</p>
                    </div>
                    <div id="cartItem">Your Bento is empty</div>
                    <div class="foot">
                        <h3 id="totalhead">Total</h3>
                        <h2 id="total">฿ 0.00</h2>
                        <h2 id="riceID">id</h2>
                    </div>
                    <form class="" action="" method="post" autocomplete="off">
                    <!--<button type="submit" name="confirm">Confirm order</button>-->
                    <button id="confirmButton" type="submit" name="confirm"><span id="cf_order">Confirm Order</span></button>
                    </form>
                </div>
            </div>
        </center>
    </section>
    </section>
    <script src="cart.js"></script>
    <script src="change_lang.js"></script>
</body>
<footer>
    <p></p>
</footer>

</html>