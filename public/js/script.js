$(document).ready(function(){
  var lat     = 13.5333;
  var long    = 2.0833;

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);
    L.marker([lat, long], {
      icon: L.mapbox.marker.icon({
        'marker-size': 'large',
        'marker-symbol': 'camera',
        'marker-color': '#fa0'
      })
    }).addTo(map);
  var cir = L.circle([lat, long], 1000).addTo(map);

  map.scrollWheelZoom.disable();



  User.fetch().then(function(users){
    users.forEach(function(user){
      $(".users").append(user.username)
    })
  })


});
