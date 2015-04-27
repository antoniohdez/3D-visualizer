/*
	General UI elements
*/
var rotationMenu = document.createElement("div");
var icon;

/*
	Camera rotation menu
*/

rotationMenu.className = "rotationMenu";

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
	Add button to rotation menu
*/

rotationMenu.appendChild(leftRotationButton);
rotationMenu.appendChild(rightRotationButton);

document.body.appendChild(rotationMenu);