var prefix = "";

var client = new Messaging.Client(broker["hostname"], broker["port"], "clientId");
client.onConnectionLost = onConnectionLost;
client.setCredentials
client.connect({onSuccess:onConnect, userName: broker["user"], password: broker["password"]});

$.getJSON( "devices.js", function( data ) {
	var items = [];
	prefix = data.prefix
	
	$.each( data.devices, function( key, val ) {
		items.push( "<li>" + val["pretty_name"] + " [<a href=\"javascript:switchOn('" + val["name"] + "');\">On</a>|<a href=\"javascript:switchOff('" + val["name"] + "');\">Off</a>]</li>" );
	});
	
	$("#devices_list").html(items.join( "" ));
});

function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("connected");
};
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0)
		console.log("onConnectionLost:"+responseObject.errorMessage);
};

function switchOn(name) {
	var message = new Messaging.Message("1");
	message.destinationName = prefix + name + "/state";
	client.send(message); 
}

function switchOff(name) {
	message = new Messaging.Message("0");
	message.destinationName = prefix + name + "/state";
	client.send(message); 
}
