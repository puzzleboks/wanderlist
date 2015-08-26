$(document).ready(function() {
  var lat     = 13.5333;
  var long    = 2.0833;

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);
  map.scrollWheelZoom.disable();

  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
    $(".popup_bar").hide();
  });


  var myIcon = L.icon({
    iconUrl: '../public/images/PinDown1.png',
    // iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowRetinaUrl: 'my-icon-shadow@2x.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
  });



  //fetch pins from user 1

  Pin.fetch(1).then(function(pins){
    pins.forEach(function(pin){
      console.log("------")
      console.log(pin)
      console.log(pin.title);
      console.log(pin.latitude);
      console.log(pin.longitude);
      console.log("pin id: " + pin.id)
      L.marker([pin.latitude, pin.longitude], {
        icon: myIcon,
        draggable: true
      }).addTo(map);
    })
  })

})
