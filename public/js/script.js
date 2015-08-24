$(document).ready(function(){
  var lat     = 51.5072;
  var long    = -0.1275;

  L.mapbox.accessToken = 'pk.eyJ1Ijoia2FybGRvbnVzIiwiYSI6Ijg1ZTY5ZDZjMTUxZTdkMzk1Y2MwOTNjNjQwZDMwNTU2In0.WOrmvw7P5KviJbR_u5febw';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);
  var myLayer = L.mapbox.featureLayer().addTo(map);

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

  map.scrollWheelZoom.enable();

  User.fetch().then(function(users){
    users.forEach(function(user){
      $(".users").append(user.username)
    })
  })


});
