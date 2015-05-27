<?php

function find_file($ext){
	$it = new RecursiveDirectoryIterator("obj/");
	$display = Array ($ext);
	$path = NULL;
	foreach(new RecursiveIteratorIterator($it) as $file)
	{
		if( in_array( strtolower( array_pop( explode( '.', $file ) ) ), $display) ){
			
			if ( is_null( $path ) ) {
				$path = $file;
			}// If already found return NULL (not multiple .obj files allowed)
			else{
				return NULL;
			}
		}
	}
	return $path;
}

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
				$flag = $zip->extractTo('obj/');
				$zip->close();

				// Unzip success
				if( $flag ){
					$obj_path = find_file("obj");
					// Obj not found
					if( is_null( $obj_path ) ){
						echo ".obj not found";
					}else{ // Obj found
						echo ".obj found: ".$obj_path;
					}

				}else{ // Unzip error
					echo "Unzip error"
				}
			} else {
				echo "open file failed";
			}

			echo $token;
			exit();

		}

	}

}

http_response_code(500);

?>