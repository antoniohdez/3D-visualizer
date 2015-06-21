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

var hideElement = function(selector, hide){
	var element = document.getElementById(selector);
	if(hide){
		element.className = element.className.replace(" hidden", "");	
	}else{
		element.className = element.className + " hidden";
	}
}

var changeDOMBeforeLoad = function(){
	hideElement("loader-animated", true); //Hide
	hideElement("file-button", false); //Show
}

var changeDOMAfterLoad = function(status){
	if (status === true) {
		hideElement("rotation-menu", true); //Hide
	}

	hideElement("file-button", true);	//Hide
	hideElement("loader-animated", false); //Show
}

var changeEmbedCode = function(token){
	if (token == "none"){
		hideElement("embed-menu", false);
	}else{
		hideElement("embed-menu", true);

		var textCode = document.getElementById("code-text");
		textCode.innerText = 'http://localhost/3d-visualizer/model/?token=' + token;
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
