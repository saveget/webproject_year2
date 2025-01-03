<?php
require 'productConnection.php';
if(isset($_POST["confirm"])){

    $query2 = "UPDATE Orders SET status_served = 'No'";
    $query3 = "UPDATE Orders SET status_pay = 'No'";
    mysqli_query($conn,$query2);
    mysqli_query($conn,$query3);




if($_SERVER["REQUEST_METHOD"] === "POST") {
    $dessert = $_POST["dessert"];
    $rice = $_POST["rice"];
    $side_dishes = $_POST["side_dishes"];
    $appi = $_POST["appi"];
    $main = $_POST["main"];
    $total = $_POST["total"];

    $query = "INSERT INTO Orders(order_id,riceID,main_courseID,side_dishesID,snacksID,dessertID,total_price,status_pay,status_served)
    VALUE ('','$rice','$main','$side_dishes','$appi','$dessert','$total','No','No');";
    echo $query;
    mysqli_query($conn,$query);
    echo"
    <script> alert('DESSERT Inserted Successfully'); </script>";
} else {
    echo "No dessert value received";
}
}
?>

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
            <h1 id="">CHECK YOUR ORDER & PAYMENT</h1>
            <br>
        </center>
            
                <center>
                <div class="sidebar">
                    <div class="head" id="headcart">
                        <p>My Bento</p>
                    </div>
                    <div id="cartItem">Your Bento is empty</div>
                    <div class="foot">
                        <h3 id="totalhead">Total</h3>
                        <h2 id="total">฿ 0.00</h2>
                    </div>
                    <img src="pp.png" class="pp">
                    <a href="bill.html"><button id="confirmButton" onclick="sendID()">Confirm Order & PAYMENT</button></a>
                </div>
                </center>


    </section>
    </section>
    <script src="reciepe.js"></script>
    <script src="bill.php"></script>
    <script src="cart.js"></script>
    <script src="change_lang.js"></script>
</body>
<footer>
    <p></p>
</footer>

</html>