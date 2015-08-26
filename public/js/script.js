$(document).ready(function() {

  $(".popup_bar").hide();

  var lat     = 13.5333;
  var long    = 2.0833;

  $(".dropdown-toggle").on("click", function() {
    console.log("click");
  })

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);
  map.scrollWheelZoom.disable();

  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
  });

  /////////// nav bar clickdown //////////
  $(".dropdown-toggle").on("click", function(){
    console.log("menu bar clicked")
    $(".dropdown-menu").show();
  });

  //my account
  $(".my-account").on("click", function(){
    console.log("my acount clicked")
    $(".account-information").toggle();
  });

  //help
  $(".help").on("click", function(){
    console.log("help clicked")
  });
  //sign out
  $(".sign-out").on("click", function(){
    console.log("sign out clicked")
  });
  //share link
  $(".share-link").on("click", function(){
    console.log("share clicked")
  });

  // red and green pin variables

  var redPin = L.icon({
    iconUrl: '../public/images/PinDown1.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
  });
  var greenPin = L.icon({
    iconUrl: '../public/images/PinDown1Green.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
  })

  //fetch pins from user 1

  Pin.fetch(1).then(function(pins){
    pins.forEach(function(pin){
      console.log("------")
      console.log(pin)
      console.log(pin.title);
      console.log(pin.latitude);
      console.log(pin.longitude);
      console.log("pin id: " + pin.id)
      if(pin.isRed == true){
        L.marker([pin.latitude, pin.longitude], {
          icon: redPin,
          draggable: true
        }).addTo(map);
      }
      else {
        L.marker([pin.latitude, pin.longitude], {
          icon: greenPin,
        }).addTo(map);
      }
    })
  })

  // add search bar functionality to add red pin

  $(".form-control").on("keypress", function(e){
    if(e.which == 13){
      e.preventDefault();
      var user_search = $(".form-control").val()
      console.log("user_search is "+user_search)
      var request = $.getJSON("https://api.mapbox.com/v4/geocode/mapbox.places/"+user_search+".json?access_token=pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog")
      .then(function(response){
        console.log(response)
        var search_location = response.features[0].geometry.coordinates
        console.log(search_location)
        L.marker([search_location[1], search_location[0]], {
          icon: redPin,
          draggable: true
        }).addTo(map)
      }).fail(function(response){
        console.log("failed to load coordinates from search");
      })
      $(".form-control").val("")
    }
  })

  // add green and red pin drop and drag

  var redMarker = L.marker([lat, long], {
    icon: redPin,
    draggable: true
  });
  var greenMarker = L.marker([lat, long], {
    icon: greenPin,
    draggable: true
  });
  $("#redPinBtn").click(function(){
    console.log("click")
    redMarker.addTo(map);
  });
  $("#greenPinBtn").click(function() {
    console.log("greenclick")
    greenMarker.addTo(map);
  })

  // add and remove sidebar on pin click

  $(".leaflet-tile-pane").on("click", function() {
    $(".popup_bar").hide();
  })

  $(".leaflet-marker-pane").on("click", function() {
    console.log("clicked a pin");
    if($(".popup_bar").css("display") == "none"){
      $(".popup_bar").toggle();
      console.log("popup bar should toggle")
    }
    else {
      console.log("Already showing");
    }
    console.log(event.target)
  })

});
