<?php
header('Access-Control-Allow-Origin: *');
include 'connection.php';
$id = $_GET['id'];
$select = mysqli_query($conn, "SELECT * FROM employee WHERE id=$id");
while ($x = mysqli_fetch_assoc($select)) {
    $arrayjson[] = $x;
}
echo json_encode($arrayjson);
?>