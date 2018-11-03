<?php 
header('Access-Control-Allow-Origin: *');
include 'connection.php';

$id = $_POST['id'];
$delete = "DELETE FROM employee WHERE id= '$id'";
$query = mysqli_query($conn,$delete) or die(mysqli_error());

if($query) {
    echo "Successfully deleted!";
}
else {
    echo "Failed to delete!";
}
?>