<?php

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


$token = $_GET["token"];

$extraction_path = "../u/". $token ."/obj/";
	
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

exit();

http_response_code(500);
?>