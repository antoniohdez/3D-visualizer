/*
	General UI elements
*/
var rotationMenu = document.createElement("div");
var leftRotationButton = document.createElement("button");
var rightRotationButton = document.createElement("button");
var icon;

/*
	Camera rotation menu
*/

rotationMenu.className = "rotationMenu";

/*
	Left rotation button
*/

icon = document.createElement("i");
icon.className = "fa fa-chevron-left";

leftRotationButton.appendChild( icon );

/*
	Right rotation button
*/

icon = document.createElement("i");
icon.className = "fa fa-chevron-right";

rightRotationButton.appendChild( icon );

/*
	Add button to rotation menu
*/

rotationMenu.appendChild(leftRotationButton);
rotationMenu.appendChild(rightRotationButton);

document.body.appendChild(rotationMenu);