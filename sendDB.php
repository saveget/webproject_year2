<?php
require 'productConnection.php';
if(isset($_POST["confirm"])){

    $query2 = "UPDATE Orders SET status_served = 'No'";
    $query3 = "UPDATE Orders SET status_pay = 'No'";
    mysqli_query($conn,$query2);
    mysqli_query($conn,$query3);




if($_SERVER["REQUEST_METHOD"] === "POST") {
    $dessert = $_POST["dessert"];
    $rice = json_decode($_POST['rice']);

    $query = "INSERT INTO Orders(order_id,riceID,main_courseID,side_dishesID,snacksID,dessertID,total_price,status_pay,status_served) 
    VALUE ('','$rice','','','','$dessert','0','No','No');";
    mysqli_query($conn,$query);
    echo"
    <script> alert('DESSERT Inserted Successfully'); </script>";
} else {
    echo "No dessert value received";
}
}
?>
