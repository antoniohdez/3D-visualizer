var zoomCamera = function (zoom){
	//camera.position.z += zoom;
}

var rotateCamera = function (angle){
	scene.rotation.y += angle*(Math.PI/180);
}

/*
	ID for interval
*/
var interval;

/*
	Zoom events
*/

var zoomInDown = function (){
	interval = setInterval(function (){
		zoomCamera(-0.1);
	}, 25);
}

var zoomInUp = function (){
	clearInterval(interval)
}

var zoomOutDown = function (){
	interval = setInterval(function (){
		zoomCamera(0.1);
	}, 25);
}

var zoomOutUp = function (){
	clearInterval(interval);
}

/*
	Rotation events
*/

var leftRotationDown = function (){
	interval = setInterval(function (){
		rotateCamera(1);
	}, 25);
}

var leftRotationUp = function (){
	clearInterval(interval);
}

var rightRotationDown = function (){
	interval = setInterval(function (){
		rotateCamera(-1);
	}, 25);
}

var rightRotationUp = function (){
	clearInterval(interval);
}

/*
	Loader events
*/

var token;

var validateFileExtension = function(filename){
	filename = filename.toLowerCase();
	var ext = filename.split(".").pop();
	// Check file extension, or check if possible fake zip (hidden file or filename = zip with no extension).
	if(ext !== "zip" || filename === "zip" || filename === ".zip" ){
		return false;
	}
	return true;
}

var loadObj = function(e){
	if( e.target.files.length !== 1 ){
		return;
	}
	
	var input = document.getElementById('obj-loader');
	var files = input.files;
	var file = files[0];

	if( validateFileExtension(file.name) === false ){
		swal({
			title: "Selecciona un archivo .zip válido", 
			type: "warning"
		});
		return;
	}

	var formData = new FormData();
	// User obj-loader (button) to load a .zip file
	formData.append('zip_file', file, file.name);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'uploads_handler.php', true);

	xhr.onload = function () {
		console.log(xhr);
		if (xhr.status === 200) {
			token = xhr.responseText;
			console.log("Upload success");
			console.log(token.responseText);

			//var objUrl = "uploads/" + token + "/" + file.name;
			//loader(objUrl, "");

		} else {
			swal({
				title: "Ocurrió un error, intenta de nuevo", 
				type: "error"
			});
			console.log('An error occurred!');
		}
	};

	xhr.send(formData);

}
