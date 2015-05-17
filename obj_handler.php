<?php
if( $_FILES["obj_file"]["error"] === 0 ){
	$token = bin2hex(openssl_random_pseudo_bytes(16));
	
	if( mkdir( "uploads/" . $token ) ){
		if( move_uploaded_file( $_FILES["obj_file"]["tmp_name"], "uploads/" . $token . "/" . $_FILES['obj_file']['name']) ){
			echo $token;
			exit();
		}
	}
}
http_response_code(500);
?>