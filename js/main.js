var scene = new THREE.Scene();
// (angle, aspect, near, far)
/*
	Angle: 
	Aspect Ratio:
	Near: Distance at which the camera will start rendering scene objects.
	Far: Anything beyond this distance will not be rendered, draw distance.
*/
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 100 );
camera.position.z = 10;

//Look at (0,0,0)
//camera.lookAt(scene.position);

/*
	CONTROLS
*/

//Move around Y axis by default
var controls = new THREE.OrbitControls( camera );
controls.addEventListener('change', render );

/*
	RENDERER (CANVAS)
*/

//Create html element (canvas)
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xCCCCCC, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*
	CUBE
*/

//Root element
var rubik = new THREE.Object3D();

//Faces
var sides = {
	"white"  : new THREE.Object3D(),
	"yellow" : new THREE.Object3D(),
	"green"  : new THREE.Object3D(),
	"blue"   : new THREE.Object3D(),
	"red"    : new THREE.Object3D(),
	"orange" : new THREE.Object3D()
}


rubik = drawCube(rubik);

scene.add(rubik);

/*
	AMBIENT LIGHT
*/

var ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

/*
	RENDER
*/

var render = function () {
	requestAnimationFrame( render );
	
	renderer.render(scene, camera);
};

render();