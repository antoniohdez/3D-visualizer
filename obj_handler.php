<?php

if( $_SERVER['REQUEST_METHOD'] === 'POST' && $_FILES["obj_file"]["error"] === 0 ){

	$token = bin2hex(openssl_random_pseudo_bytes(16));

	// Get file extension
	$ext = strtolower(pathinfo($_FILES["obj_file"]["name"], PATHINFO_EXTENSION));

	// Check if file extension is valid and if folder can be created
	if( $ext === "obj"  &&  mkdir( "uploads/" . $token ) ){

		if( move_uploaded_file( $_FILES["obj_file"]["tmp_name"], "uploads/" . $token . "/" . $_FILES['obj_file']['name']) ){
			
			echo $token;
			exit();

		}

	}

}

http_response_code(500);

?>