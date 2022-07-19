<?php

session_start();

if (isset($_SESSION["admin_id"])) {
	session_destroy();
	header("location:../View/login.php");
}else{
	header("location:../View/index.php");
}


?>