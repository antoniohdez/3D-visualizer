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

var loadObj = function(){

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'model_handler.php?token=' + urlToken, true);

	xhr.onload = function () {
		console.log(xhr);
		
		var response = JSON.parse(xhr.responseText);

		if (xhr.status === 200) {
			
			if(response.status === "success"){
				var obj = "../" + response.data.token + "/" + response.data.obj;
				var mtl = "../" + response.data.token + "/" + response.data.mtl;
				loader(obj, mtl);

				changeDOMAfterLoad(true);

				return;
			}
		} 
		swal({
			title: response.message, 
			type: "error"
		});
		changeDOMAfterLoad(false);
		
	};

	xhr.send();

}

window.onload = loadObj;
