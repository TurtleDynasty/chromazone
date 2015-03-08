// App ID value from the dev portal. You can play
// around with the supplied ID or replace it with
// your own.
var appid = "c5079ec6-3404-4e72-9061-78b7e3e87472";
var endpointId;
//get location
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		$("#status").html("Geolocation is not supported by this browser.");
	}
}
//show the lat and long
function showPosition(position) {
	$("#status").append("<br>Latitude: " + position.coords.latitude + 
	"<br>Longitude: " + position.coords.longitude);  
}
// Create the client object using the App ID 
var client = respoke.createClient({
	appId: appid,
	developmentMode: true
});

// "connect" event fired after successful connection to Respoke
client.listen('connect', function() {
	$("#status").html("Connected to Respoke as \"" + endpointId + "\"");
});

// Listen for incoming messages
client.listen('message', function(evt) {
	$("#messages").append(
		"<li>" + evt.message.message + "</li>"
	);
});

// Connect to Respoke when the user clicks "connect"
$("#doLogin").click(function() {
	$("#status").html("Connecting...");
	endpointId = $("#endpoint").val;
	client.connect({
		endpointId: endpointId // your username is the endpoint
	});
	showPosition(getLocation());
});

// Send message
$("#sendMessage").click(function() {
	// Get the recipients name
	var remote = $("#remoteId").val();

	// Make an endpoint for that recipient
	var endpoint = client.getEndpoint({
		id: remote
	});

	// Grab the text to send
	var messageText = $("#textToSend").val();

	// Send it
	endpoint.sendMessage({
		message: messageText
	});

	// Show yourself the message
	$("#messages").append(
		"<li>" + messageText + "</li>"
	);

	// Clear the text you just sent
	$("#textToSend").val('');
});