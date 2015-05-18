/*
	THIS FILE INCLUDE ALL FUNCTION USED BY THE LOADER DEFINED AT THE AND
*/

var cleanScene = function(name){
	var model = scene.getObjectByName(name);
	scene.remove(model);
}

var resetCamera = function(cameraZ){
	camera.position.set(0, 0, cameraZ);
	camera.rotation.set(0, 0, 0, 'XYZ');
	camera.far = cameraZ*2;

	// Must be called after change of parameters.
	camera.updateProjectionMatrix();

}

var resetScene = function(){
	scene.position.set(0, 0, 0);
	scene.rotation.set(0, 0, 0, 'XYZ');
}

var getRadiusGeometry = function(object){
	var radius = 0;
	if( object.type === "Mesh" ){
		return object.geometry.boundingSphere.radius;
	}else{
		var tmpRadius = 0;
		object.children.forEach(function(obj){
			
			tmpRadius = getRadiusGeometry(obj);
			
			if( tmpRadius > radius ){
				radius = tmpRadius;
			}
		});
	}

	return radius;
}

/*
	LOADER FOR OBJ/MTL FILES
*/

var loader = function(url, mtlUrl){
	cleanScene("loader-model");
	resetScene();

	var loader = new THREE.OBJMTLLoader();
	loader.load(url, mtlUrl, function(object) {

		console.log(object);
		
		object.position.x = 0;
		object.position.y = 0;
		object.position.z = 0;
		object.scale.set(1, 1, 1);

		object.name = "loader-model";

		var radius = getRadiusGeometry(object);
		var distance = radius*4;
		resetCamera( distance );
		
		scene.add(object);

	});	
}