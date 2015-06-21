var client = new ZeroClipboard( document.getElementById("copy-button") );

client.on( "ready", function( readyEvent ) {
	
	client.on( "copy", function( event ) {
		event.clipboardData.setData('text/plain', document.getElementById("code-text").innerHTML);
		swal({
			title: "Copied to clipboard!", 
			text: document.getElementById("code-text").innerHTML,
			type: "success"
		});
	});

	client.on( 'error', function(event) {
		// console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
		ZeroClipboard.destroy();
		swal({
			title: "Couldn't copy url to clipboard!", 
			type: "error"
		});
	});

});