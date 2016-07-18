// Function to send a message to the Pebble using AppMessage API
// We are currently only sending a message using the "status" appKey defined in appinfo.json/Settings
function sendMessage(summary) {
	Pebble.sendAppMessage({"message": summary}, messageSuccessHandler, messageFailureHandler);
}

// Called when the message send attempt succeeds
function messageSuccessHandler() {
  console.log("Message send succeeded.");  
}

// Called when the message send attempt fails
function messageFailureHandler() {
  console.log("Message send failed.");
  sendMessage();
}

// Called when JS is ready
Pebble.addEventListener("ready", function(e) {
  sleep(1000);
  var xmlhttp = new XMLHttpRequest();
  
  var url = "http://pokeapi.co/api/v2/pokemon/" + (Math.round((Math.random() * 100)) + 1);

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var infoFromAPI = JSON.parse(xmlhttp.responseText);
          var name = capitalizeFirstLetter(infoFromAPI.name);
        var weight = infoFromAPI.weight;
        var height = infoFromAPI.height;
        
        var message = name + " is " + height + " inches high and " + weight + " oz";
        
          sendMessage(message);
      }
  };
  
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
});
												
// Called when incoming message from the Pebble is received
// We are currently only checking the "message" appKey defined in appinfo.json/Settings
Pebble.addEventListener("appmessage", function(e) {
  console.log("Received Message: " + e.payload.message);
});


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}