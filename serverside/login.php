<?php 
header('Access-Control-Allow-Origin: *');
include 'connection.php';

$username = $_POST['x'];
$password = $_POST['y'];

$check = "SELECT * FROM userlogin WHERE username='$username' AND password= '$password' ";
$query = mysqli_query($conn, $check);
$row = mysqli_num_rows($query);

if($row > 0)
    { echo 1; }
else 
    { echo 0; }
?>