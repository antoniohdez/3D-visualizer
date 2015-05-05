/*
	General UI elements
*/
var topLeftMenu = document.createElement("div");
var zoomMenu = document.createElement("div");
var rotationMenu = document.createElement("div");
var icon;

/*
	Top-left menu
*/

topLeftMenu.className = "top-left-menu";


/*

	ZOOM MENU

*/

zoomMenu.className = "zoom-menu";

/*
	Zoom in button
*/

var zoomInButton = document.createElement("button");

icon = document.createElement("i");
icon.className = "fa fa-plus";

zoomInButton.appendChild( icon );

zoomInButton.addEventListener("mousedown", zoomInDown);
zoomInButton.addEventListener("mouseup", zoomInUp);
zoomInButton.addEventListener("mouseleave", zoomInUp);

var tmpDiv = document.createElement("div");
tmpDiv.appendChild(zoomInButton);

zoomInButton = tmpDiv;

/*
	Zoom out button
*/

var zoomOutButton = document.createElement("button");

icon = document.createElement("i");
icon.className = "fa fa-minus";

zoomOutButton.appendChild( icon );

zoomOutButton.addEventListener("mousedown", zoomOutDown);
zoomOutButton.addEventListener("mouseup", zoomOutUp);
zoomOutButton.addEventListener("mouseleave", zoomOutUp);

tmpDiv = document.createElement("div");
tmpDiv.appendChild(zoomOutButton);

zoomOutButton = tmpDiv;

/*
	Add buttons to zoom menu
*/

zoomMenu.appendChild(zoomInButton);
zoomMenu.appendChild(zoomOutButton);

/*

	ROTATION MENU

*/

rotationMenu.className = "rotation-menu";

/*
	Left rotation button
*/

var leftRotationButton = document.createElement("button");

icon = document.createElement("i");
icon.className = "fa fa-chevron-left";

leftRotationButton.appendChild( icon );

leftRotationButton.addEventListener("mousedown", leftRotationDown);
leftRotationButton.addEventListener("mouseup", leftRotationUp);
leftRotationButton.addEventListener("mouseleave", leftRotationUp);

/*
	Right rotation button
*/

var rightRotationButton = document.createElement("button");

icon = document.createElement("i");
icon.className = "fa fa-chevron-right";

rightRotationButton.appendChild( icon );

rightRotationButton.addEventListener("mousedown", rightRotationDown);
rightRotationButton.addEventListener("mouseup", rightRotationUp);
rightRotationButton.addEventListener("mouseleave", rightRotationUp);

/*
	Add buttons to rotation menu
*/

rotationMenu.appendChild(leftRotationButton);
rotationMenu.appendChild(rightRotationButton);

/*
	Add individual menu (zoom, rotation) to topLeftMenu
*/

//topLeftMenu.appendChild(zoomMenu);
topLeftMenu.appendChild(rotationMenu);

document.body.appendChild(topLeftMenu);