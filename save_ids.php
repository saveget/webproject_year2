<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the JSON data sent from the client and decode it
    $ids = json_decode(file_get_contents("cart.js"));

    // Example: Connect to your database
    require 'productConnection.php';
    // Example: Insert ids into your database
    foreach ($ids as $id) {
        $sql = "INSERT INTO Orders (riceID) VALUES ('$id')";
        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    echo "Ids inserted successfully";

    $conn->close();
}
?>
