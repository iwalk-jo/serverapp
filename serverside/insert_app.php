<?php 
header('Access-Control-Allow-Origin: *');
include 'connection.php';

$name = $_POST['x'];
$phone = $_POST['y'];
$address = $_POST['z'];

$insert = "INSERT INTO employee (name, phone, address) 
VALUES ('$name', '$phone', '$address')";


$result = mysqli_query($conn,$insert) or die(mysqli_error());
if ($result)
{ echo "1"; }
else
{ echo "0"; }
?>