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

var changeDOMBeforeLoad = function(){
	var animatedLoader = document.getElementById('loader-animated');
	animatedLoader.className = animatedLoader.className.replace(" hidden", "");

	var fileButton = document.getElementById('file-button');
	fileButton.className = fileButton.className + " hidden";
}

var changeDOMAfterLoad = function(status){
	if (status === true) {
		var menu = document.getElementById("rotation-menu");
		menu.className = menu.className.replace("hidden", "");
	}

	var fileButton = document.getElementById('file-button');
	fileButton.className = fileButton.className.replace(" hidden", "");

	var animatedLoader = document.getElementById('loader-animated');
	animatedLoader.className = animatedLoader.className + " hidden";
}

var changeEmbedCode = function(token){
	if (token == "none"){
		var embedMenu = document.getElementById('embed-menu');
		embedMenu.className = embedMenu.className + " hidden";
		
	}else{
		var embedMenu = document.getElementById('embed-menu');
		embedMenu.className = embedMenu.className.replace(" hidden", "");

		var textCode = document.getElementById("code-text");
		textCode.innerText = '<embed src="http://localhost/3d-visualizer/model/?token="' + token + '">';
	}
}

var prepareFile = function(e){
	if( e.target.files.length !== 1 ){
		return {status : false, data : undefined};
	}
	
	var files = document.getElementById('obj-loader').files;
	var file = files[0];

	if( validateFileExtension(file.name) === false ){
		swal({
			title: "Selecciona un archivo .zip válido", 
			type: "warning"
		});
		return {status : false, data : undefined};
	}

	var formData = new FormData();
	formData.append('zip_file', file, file.name);

	return {status : true, data : formData};
}

var loadObj = function(e){
	var data = prepareFile(e);
	var formData;

	if(data["status"] === true){
		formData = data["data"];
	}else{
		return;
	}

	changeDOMBeforeLoad();

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'uploads_handler.php', true);

	xhr.onload = function () {
		console.log(xhr);
		
		var response = JSON.parse(xhr.responseText);

		if (xhr.status === 200) {
			
			if(response.status === "success"){
				var obj = "u/" + response.data.token + "/" + response.data.obj;
				var mtl = "u/" + response.data.token + "/" + response.data.mtl;
				loader(obj, mtl);

				changeDOMAfterLoad(true);
				changeEmbedCode(response.data.token);

				return;
			}
		} 
		swal({
			title: response.message, 
			type: "error"
		});
		changeDOMAfterLoad(false);
		changeEmbedCode("none");
		
	};

	xhr.send(formData);

}
