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

var createLoaderMenu = function(){
	var loaderMenu = document.createElement("div");
	loaderMenu.className = "loader-menu";

	/* Load .obj rotation button */

	var objButton = (function(){
		var objButton = document.createElement("input");
		objButton.id = "obj-loader"
		objButton.type = "file";

		//objButton.addEventListener("click", loadObj);

		objButton.addEventListener("change", loadObj);

		var icon = document.createElement("i");
		icon.id = "file-icon";
		icon.className = "fa fa-upload";
		
		var text = document.createElement("span");
		text.id = "file-text";
		text.innerHTML = "&nbsp; Cargar modelo desde .zip"

		var inputContainer = document.createElement("span");
		inputContainer.id = "file-button";
		inputContainer.className = "file-input";
		
		inputContainer.appendChild(objButton);
		inputContainer.appendChild(icon);
		inputContainer.appendChild(text);

		
		inputContainer.addEventListener("click", function(){
			objButton.click();
		});

		return inputContainer;
	})();

	/* Add buttons to loader menu */

	loaderMenu.appendChild(objButton);

	document.body.appendChild(loaderMenu);
}

createZoomMenu();
createRotationMenu();
createLoaderMenu();