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

var showMtl = function(show){
	var mtl = document.getElementById("mtl-loader");
	if(show){
		mtl.style.display = "inline-block";	
	}else{
		mtl.style.display = "none";	
	}
}

var loadMtl = function(){

}

var loadObj = function(e){
	if( e.target.files.length == 0 ){
		showMtl(false);
	}else{
		
		var input = document.getElementById('obj-loader');
		var files = input.files;
		var formData = new FormData();

		var file = files[0];
		formData.append('obj_file', file, file.name);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'obj_handler.php', true);

		xhr.onload = function () {
			console.log(xhr);
			if (xhr.status === 200) {
				token = xhr.responseText;
				console.log("Upload success");

				var objUrl = "uploads/" + token + "/" + file.name;
				loader(objUrl, "");

				showMtl(true);


			} else {
				console.log('An error occurred!');
			}
		};

		xhr.send(formData);

	}
}
