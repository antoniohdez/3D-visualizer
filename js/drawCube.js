var getMaterial = function (x, y, z){
	var defaultColor = 0x000000;
	var materials = [
		new THREE.MeshLambertMaterial({ //color: 0x0051BA //Blue
			color: defaultColor
		}),
		new THREE.MeshLambertMaterial({ //color: 0x009E60 //Green
			color: defaultColor
		}),
		new THREE.MeshLambertMaterial({ //color: 0xFFFFFF //White
			color: defaultColor
		}),
		new THREE.MeshLambertMaterial({ //color: 0xFFD500 //Yellow
			color: defaultColor
		}),
		new THREE.MeshLambertMaterial({ //color: 0xC41E3A //Red
			color: defaultColor
		}),
		new THREE.MeshLambertMaterial({ //color: 0xFF5800 //Orange
			color: defaultColor
		})
	];
	
	if( x == 1 ){ //Blue
		materials[0] = new THREE.MeshLambertMaterial({ color: 0x0051BA })
	}else if( x == -1 ){ //Green
		materials[1] = new THREE.MeshLambertMaterial({ color: 0x009E60 })
	}

	if( y == 1 ){ //White
		materials[2] = new THREE.MeshLambertMaterial({ color: 0xFFD500 })
	}else if( y == -1 ){ //Yellow
		materials[3] = new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
	}

	if( z == 1 ){ //Red
		materials[4] = new THREE.MeshLambertMaterial({ color: 0xC41E3A })
	}else if( z == -1 ){ //Orange
		materials[5] = new THREE.MeshLambertMaterial({ color: 0xFF5800 })
	}

	return materials;
}

var drawCube = function (rubik){
	//var i = 1;
	for(var x = -1; x <= 1; x++ ){
		for(var y = -1; y <= 1; y++ ){
			for(var z = -1; z <= 1; z++ ){
				//console.log( "Line " + (i++) + " " + "X: " + x + " Y: " + y + " Z: " + z );
				
				materials = getMaterial(x, y, z);

				cube = new THREE.Mesh(
				    new THREE.BoxGeometry(0.9, 0.9, 0.9, 1, 1, 1),
				    new THREE.MeshFaceMaterial( materials ));
				cube.position.x = x;
				cube.position.y = y;
				cube.position.z = z;

				rubik.add(cube);

			}
		}
	}
	rubik.rotation.x = 180*(Math.PI/180);
	rubik.rotation.y = 180*(Math.PI/180);

	return rubik;
}