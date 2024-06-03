<?php
    require 'productConnection.php';
    $query = "SELECT * FROM rice";
    $result = mysqli_query($conn, $query);
    $riceData = array();
    $riceID = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $rowData = array(
            'riceID' => $row['riceID'],
            'riceName' => $row['riceName'],
            'countrice' => $row['countrice'],
            'rice_price' => $row['rice_price'],
            'link_ricepic' => $row['link_ricepic']
        );

        $riceData[] = $rowData;
    }

    mysqli_close($conn);
    echo json_encode(array('rice' => $riceData));

?>