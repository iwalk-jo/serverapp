<?php 
header('Access-Control-Allow-Origin: *');
include 'connection.php';

$iddata = $_POST['id'];
$name = $_POST['x'];
$phone = $_POST['y'];
$address = $_POST['z'];

$update = "UPDATE employee 
SET name ='$name', phone ='$phone', address ='$address'
WHERE id ='$iddata'";


$update = mysqli_query($conn,$update) or die(mysqli_error());
if ($update)
{ echo "1"; }
else
{ echo "0"; }
?>