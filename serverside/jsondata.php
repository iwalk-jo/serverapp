<?php
header('Access-Control-Allow-Origin: *');
include 'connection.php';
$select = mysqli_query($conn, "SELECT * FROM employee");
while ($x = mysqli_fetch_assoc($select)) {
    $arrayjson[] = $x;
}
echo json_encode($arrayjson);
?>