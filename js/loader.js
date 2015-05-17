/*
	LOADER FOR OBJ/MTL FILES
*/

var loader = new THREE.OBJMTLLoader();
loader.load('obj/Ladder.obj', 'obj/Ladder.mtl', function(object) {

	console.log(object);
	
	object.position.x = 0;
	object.position.y = 0;
	object.position.z = 0;
	object.scale.set(1, 1, 1);

	scene.add(object);
	
});