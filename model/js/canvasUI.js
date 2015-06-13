/*
	Functions called at the end of the file
*/

var createZoomMenu = function(){
	var zoomMenu = document.createElement("div");
	zoomMenu.id = "zoom-menu";
	zoomMenu.className = "zoom-menu hidden";

	/* 
		Zoom in button 
	*/

	var zoomInButton = (function(){
		var zoomInButton = document.createElement("button");

		var icon = document.createElement("i");
		icon.className = "fa fa-plus";

		zoomInButton.appendChild( icon );

		zoomInButton.addEventListener("mousedown", zoomInDown);
		zoomInButton.addEventListener("mouseup", zoomInUp);
		zoomInButton.addEventListener("mouseleave", zoomInUp);

		var container = document.createElement("div");
		container.appendChild(zoomInButton);

		return container;
	})();

	/* 
		Zoom out button 
	*/

	var zoomOutButton = (function(){
		var zoomOutButton = document.createElement("button");

		var icon = document.createElement("i");
		icon.className = "fa fa-minus";

		zoomOutButton.appendChild( icon );

		zoomOutButton.addEventListener("mousedown", zoomOutDown);
		zoomOutButton.addEventListener("mouseup", zoomOutUp);
		zoomOutButton.addEventListener("mouseleave", zoomOutUp);

		tmpDiv = document.createElement("div");
		tmpDiv.appendChild(zoomOutButton);

		return tmpDiv
	})();

	/* Add buttons to zoom menu */

	zoomMenu.appendChild(zoomInButton);
	zoomMenu.appendChild(zoomOutButton);

	//document.body.appendChild(zoomMenu);
}

var createRotationMenu = function(){
	var rotationMenu = document.createElement("div");
	rotationMenu.id = "rotation-menu";
	rotationMenu.className = "rotation-menu hidden";

	/* Left rotation button */

	var leftRotationButton = (function(){
		var leftRotationButton = document.createElement("button");

		var icon = document.createElement("i");
		icon.className = "fa fa-chevron-left";

		leftRotationButton.appendChild( icon );

		leftRotationButton.addEventListener("mousedown", leftRotationDown);
		leftRotationButton.addEventListener("mouseup", leftRotationUp);
		leftRotationButton.addEventListener("mouseleave", leftRotationUp);

		return leftRotationButton;
	})();

	/* Right rotation button */

	var rightRotationButton = (function(){
		var rightRotationButton = document.createElement("button");

		var icon = document.createElement("i");
		icon.className = "fa fa-chevron-right";

		rightRotationButton.appendChild( icon );

		rightRotationButton.addEventListener("mousedown", rightRotationDown);
		rightRotationButton.addEventListener("mouseup", rightRotationUp);
		rightRotationButton.addEventListener("mouseleave", rightRotationUp);

		return rightRotationButton;
	})();

	/* Add buttons to rotation menu */

	rotationMenu.appendChild(leftRotationButton);
	rotationMenu.appendChild(rightRotationButton);

	document.body.appendChild(rotationMenu);
}

createZoomMenu();
createRotationMenu();