var Pin = function(info){
  this.title = info.title;
  this.latitude = info.latitude;
  this.longitude = info.longitude;
  this.userId = info.userId;
  this.isRed = info.isRed;
  this.description = info.description;
};

Pin.fetch = function(userId){
  var request = $.getJSON("http://localhost:3000/users/"+userId+"/pins/")
  .then(function(response) {
    var pins = [];
    for(var i = 0; i < response.length; i++){
      pins.push(new Pin(response[i]));
    }
    return pins;
  })
  .fail(function(response){
    console.log("failed to fetch pins from user with id: "+userId);
  });
  return request;
}
