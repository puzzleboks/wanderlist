$(document).ready(function(){
  var lat     = 13.5333;
  var long    = 2.0833;

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);

  var myLayer = L.mapbox.featureLayer().addTo(map);

  // var cir = L.circle([lat, long]).addTo(map);
  // L.marker([lat, long], {
  //   icon: L.mapbox.marker.icon({
  //     'marker-size': 'medium',
  //     'marker-color': '#ff0000'
  //   })
  // }).addTo(map).on("click", function(){
  //
  //   console.log("click");
  // });


var geoJson = [
  {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [-75.00, 40]
    },
    "properties": {
        "title": "red pin",
        "icon": {
            "iconUrl": "../public/images/PinDown1.png",
            "iconSize": [22, 27], // size of the icon
            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
            "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
            "className": "dot"
        }
    }
},{
  "type": "Feature",
  "geometry": {
      "type": "Point",
      "coordinates": [51.5072, -0.1275]
  },
  "properties": {
      "title": "green pin",
      "icon": {
          "iconUrl": "../public/images/PinDown1Green.png",
          "iconSize": [22, 27], // size of the icon
          "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
          "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
          "className": "dot"
      }
  }
}

];

// Set a custom icon on each marker based on feature properties.
myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    marker.setIcon(L.icon(feature.properties.icon));
});

myLayer.on("click", function(){
  console.log("click")
})

// Add features to the map.
myLayer.setGeoJSON(geoJson);

map.scrollWheelZoom.disable();

  User.fetch().then(function(users){
    users.forEach(function(user){
      $(".users").append(user.username)
    })
  })

  // users/1/pins gets a json list of that user's pins


});
