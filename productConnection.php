<?php
$host='sql310.infinityfree.com'; //mysql host name
$user='if0_35759294'; //mysql username
$pass='HelloNokia'; //mysql password
$db='if0_35759294_myproject'; //mysql database
$conn=mysqli_connect($host,$user,$pass,$db);
if($conn) {}
else { echo "Connection error";}
?>