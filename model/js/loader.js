/*
	THIS FILE INCLUDE ALL FUNCTION USED BY THE LOADER DEFINED AT THE AND
*/

var cleanScene = function(name){
	var model = scene.getObjectByName(name);
	scene.remove(model);
}

var resetCamera = function(cameraY, cameraZ){
	camera.position.set(0, cameraY, cameraZ);
	camera.rotation.set(0, 0, 0, 'XYZ');
	camera.far = cameraZ * 10;
	
	controls.target = new THREE.Vector3(0, cameraY, 0);

	// Must be called after change of parameters.
	camera.updateProjectionMatrix();

}

var resetScene = function(){
	scene.position.set(0, 0, 0);
	scene.rotation.set(0, 0, 0, 'XYZ');
}

var compareBounding = function(bounding, tmpBounding){
	for (var prop in bounding.positive) {
		if (bounding.positive.hasOwnProperty(prop)) {
			if( tmpBounding.positive[prop] > bounding.positive[prop] ){
				bounding.positive[prop] = tmpBounding.positive[prop];
			}
		}
	}
	for (var prop in bounding.negative) {
		if (bounding.negative.hasOwnProperty(prop)) {
			if( tmpBounding.negative[prop] < bounding.negative[prop] ){
				bounding.negative[prop] = tmpBounding.negative[prop];
			}	
		}
	}
	return bounding;
}

var getBoundingGeometry = function(object){
	var bounding = {
		positive : { x : 0, y : 0, z : 0 },
		negative : { x : 0, y : 0, z : 0 }
	};
	var radius = 0;
	var center = 0;

	if( object.type === "Mesh" ){
		radius = object.geometry.boundingSphere.radius;
		center = object.geometry.boundingSphere.center;

		bounding.positive.x = center.x + radius;
		bounding.positive.y = center.y + radius;
		bounding.positive.z = center.z + radius;

		bounding.negative.x = center.x - radius;
		bounding.negative.y = center.y - radius;
		bounding.negative.z = center.z - radius;

	}else{
		var tmpBounding = bounding;
		object.children.forEach(function(obj){

			tmpBounding = getBoundingGeometry(obj);
			bounding = compareBounding(bounding, tmpBounding);

		});
	}

	return bounding;
}

/*
	LOADER FOR OBJ/MTL FILES
*/

var loader = function(url, mtlUrl){
	// Loaded model is always named "loader-model"
	cleanScene("loader-model");
	resetScene();

	var loader = new THREE.OBJMTLLoader();
	loader.load(url, mtlUrl, function(object) {

		console.log(object);
		
		object.position.x = 0;
		object.position.y = 0;
		object.position.z = 0;
		object.scale.set(1, 1, 1);

		// Loaded model is always named "loader-model"
		object.name = "loader-model";
		
		var bounding = getBoundingGeometry(object);
		var z = bounding.positive.z*4;
		var y = ( bounding.positive.y - bounding.negative.y ) / 2;

		resetCamera(y, z);
		
		scene.add(object);

	});	
}