<?php

if( $_SERVER['REQUEST_METHOD'] === 'POST' && $_FILES["zip_file"]["error"] === 0 ){

	$token = bin2hex(openssl_random_pseudo_bytes(16));

	// Get file extension
	$ext = strtolower(pathinfo($_FILES["zip_file"]["name"], PATHINFO_EXTENSION));

	$path = __DIR__ . "/uploads/" . $token;
	// Check if file extension is valid and if folder can be created
	if( $ext === "zip"  &&  mkdir( $path ) ){
		
		chdir($path);
		mkdir("obj");

		if( move_uploaded_file( $_FILES["zip_file"]["tmp_name"], "file.zip" ) ){
			
			$zip = new ZipArchive;
			if ($zip->open("file.zip") === TRUE) {
				$zip->extractTo('/obj');
				$zip->close();
				echo 'ok';
			} else {
				echo 'failed';
			}

			echo $token;
			exit();

		}

	}

}

http_response_code(500);

?>