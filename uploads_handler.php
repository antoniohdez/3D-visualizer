<?php

/*
	$token => Path where zip will be uploaded
*/
function upload_zip($token, $zip_file){
	$flag = false;

	if( $_FILES["zip_file"]["error"] === 0 ){
	
		// Get file extension
		$ext = strtolower(pathinfo($_FILES["zip_file"]["name"], PATHINFO_EXTENSION));

		// Path where zip will be uploaded
		$path = __DIR__ . "/u/" . $token;

		if( $ext === "zip"  &&  mkdir( $path ) ){
			
			chdir($path);

			if( move_uploaded_file( $_FILES["zip_file"]["tmp_name"], $zip_file ) ){
				$flag = true;
			}
		}
	}
	return $flag;
}

/*
	$ext => File extension to search
*/
function find_file($ext, $dir){
	$it = new RecursiveDirectoryIterator($dir);
	$display = array($ext);
	$path = NULL;
	foreach(new RecursiveIteratorIterator($it) as $file)
	{

		if( in_array( strtolower( array_pop( explode( ".", $file ) ) ), $display) ){
				
			if ( is_null( $path ) ) {
				$path = $file;
			}// If already found return NULL (not multiple .obj files allowed)
			else{
				return NULL;
			}
		}
	}
	if( is_null($path) ){
		return $path;
	}
	return (string)$path;
}

/*
	$filename => Path to .zip file
	$extractDir => Path where zip will be extracted
*/
function unzip_file($filename, $extractDir){
	$zip = new ZipArchive;
	$flag = $zip->open( $filename );
	
	if ( $flag ) {
		mkdir($extractDir);
		$flag = $zip->extractTo( $extractDir );
		$zip->close();
	} 
	
	return $flag;
}

/*
	$status => Status response
	$resposne => Can be a message (error, fail) or an object with return data (success).
*/
function server_response($status, $response){
	$json;

	if( $status === "fail" || $status === "error" ){
		http_response_code(500);
		$json = array(
			"status" => $status, 
			"message" => $response
		);
	}
	elseif ( $status === "success" ) {
		$json = array(
			"status" => $status, 
			"data" => $response
		);
	}else{
		http_response_code(500);
		$json = array(
			"status" => "error", 
			"message" => "unknown error"
		);
	}

	header('Content-Type: application/json');
	echo json_encode( $json );
}

if( $_SERVER["REQUEST_METHOD"] === "POST" ){

	$token = bin2hex(openssl_random_pseudo_bytes(16));
	$zip_file = "file.zip";

	if( upload_zip( $token, $zip_file ) ){

		$extraction_path = "obj/";
		if( unzip_file( $zip_file, $extraction_path ) ){
			
			$obj_path = find_file( "obj", $extraction_path );
			$mtl_path = find_file( "mtl", $extraction_path );
			
			// Obj not found
			if( is_null( $obj_path ) ){
				server_response("fail", ".obj file not found");

			}else{ // Obj found
				server_response("success", 
					array(
						"token" => $token,
						"obj" => $obj_path,
						"mtl" => $mtl_path
					)
				);
				exit();

			}
		}else{
			server_response("error", "Can't unzip file");
		}
	}else{
		server_response("fail", "Invalid file extension");	
	}		
	exit();
}
http_response_code(500);
?>