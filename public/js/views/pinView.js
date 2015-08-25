var PinView = function(pin){
  this.pin = pin;
  this.render();
}

PinView.prototype = {
  render: function() {

  }
}


var geoJson = [
  {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [-75.00, 40]
    },
    "properties": {
        "title": "London",
        "description": "My great trip to London",
        "icon": {
            "iconUrl": "../public/images/PinDown1.png",
            "iconSize": [22, 27], // size of the icon
            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
            "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
            "className": "potato"
        }
    }
},{
  "type": "Feature",
  "geometry": {
      "type": "Point",
      "coordinates": [51.5072, -0.1275]
  },
  "properties": {
      "title": "Algeria",
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


// Add features to the map.
myLayer.setGeoJSON(geoJson);
