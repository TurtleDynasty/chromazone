// here's the App ID value from the portal:
var appid = "DD90A374-0C06-456F-9D4F-E8038E6523D2";

// create a client object using the App ID value from Step 2
var client = respoke.createClient({
    appId: appid,
    developmentMode: true
});

// listen for the 'connect' event
client.listen('connect', function () {
    $("#status").html("Connected to Respoke!");
});

// now connect when the user clicks the 'Connect' button
$("#doLogin").click(function () {
    var endpoint = $("#endpoint").val();
    client.connect({
        endpointId: endpoint // your username is the endpoint
    });
});

// listen for incoming messages
client.listen('message', function(evt) {
    $("#messages").append(
        "<li>" + evt.message.message + "</li>"
    );
});

$("#sendMessage").click(function (){

    // get the recipient name
    var remote = $("#remoteId").val();

    // make an endpoint for that recipient
    var endpoint = client.getEndpoint({ id: remote });

    // grab the text to send
    var messageText = $("#textToSend").val();

    // send it
    endpoint.sendMessage({ message : messageText });

    // show yourself the message
    $("#messages").append(
        "<li>" + messageText + "</li>"
    );

    // clear the text you just sent
    $("#textToSend").val('');
});