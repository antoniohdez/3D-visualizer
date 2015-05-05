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
