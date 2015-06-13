<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>3D Visualizer</title>
	<meta name="description" content="3D visualizer for 3D obj files">
	<meta name="author" content="Antonio Hernández Campos">

	<link rel="stylesheet" href="../css/font-awesome.min.css">
	<link rel="stylesheet" href="../css/styles.css">
	<link rel="stylesheet" href="../css/loader.css">
	
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="../lib/sweetalert/css/sweetalert.css">
	<script src="../lib/sweetalert/js/sweetalert.min.js"></script>
</head>

<body>
	<div id="loader-animated" class="load-bar hidden">
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
		<div class="bar"></div>
	</div>
	<!-- Three.js plugins -->
	<script src="../js/three.min.js"></script>
	<script src="../js/controls/OrbitControls.js"></script>

	<!-- Loaders for obj/mtl models-->
	<!--<script src="js/loaders/OBJLoader.js"></script>-->
	<script src="../js/loaders/MTLLoader.js"></script>
	<script src="../js/loaders/OBJMTLLoader.js"></script>

	<!-- Development's code -->
	<script>
	<?php
		print "var urlToken = '" . $_GET["token"] . "';" ;
	?>
	</script>

	<script src="js/main.js"></script>
	<script src="js/loader.js"></script>
	<script src="js/eventHandlers.js"></script>
	<script src="js/canvasUI.js"></script>
</body>
</html>