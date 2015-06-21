var scene = new THREE.Scene();
// (angle, aspect, near, far)
/*
	Angle: 
	Aspect Ratio:
	Near: Distance at which the camera will start rendering scene objects.
	Far: Anything beyond this distance will not be rendered, draw distance.
*/
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.z = 100;

//Look at (0,0,0)
//camera.lookAt(scene.position);

/*
	AMBIENT LIGHT
*/

var ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

/*
	RENDERER (CANVAS)
*/

//Create html element (canvas)
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x363636, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*
	CONTROLS
*/

//Move around Y axis by default
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener('change', render );

/*
	RESIZE LISTENER
*/

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

/*
	RENDER
*/

var render = function () {
	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

render();