var MapView = function() {
  greenMarkers = new L.layerGroup();
  redMarkers = new L.layerGroup();
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  this.map = L.mapbox.map('map', 'mapbox.streets').setView([13.5333, 2.0833], 3);
  this.map.scrollWheelZoom.disable();
  L.control.layers(null, {
    'Green Pins': greenMarkers.addTo(this.map),
    'Red Pins': redMarkers.addTo(this.map),
  },{position:'bottomleft'}).addTo(this.map);

  
  // myMap = this.map;

  // addGreenLayer(greenMarkers);
  // addRedLayer(redMarkers);

  // function addGreenLayer(layer) {
  //   myMap.addLayer(layer);
  //   $('input[id="green_pins"]').click(function() {
  //     if ( $(this).is(':checked') ) {
  //       myMap.addLayer(layer);
  //     }else{
  //       myMap.removeLayer(layer);
  //     }
  //   });
  // }
  //
  // function addRedLayer(layer) {
  //   myMap.addLayer(layer);
  //   $('input[id="red_pins"]').click(function() {
  //     if ( $(this).is(':checked') ) {
  //       myMap.addLayer(layer);
  //     }else{
  //       myMap.removeLayer(layer);
  //     }
  //   });
  // }
}

MapView.prototype = {
  renderGreenMarker: function(marker) {
    var self = this;
    marker.marker.addTo(greenMarkers);
    marker.marker.on('dragend', function(){
      var temp = marker.marker.getLatLng();
      current_latitude = temp.lat;
      current_longitude = temp.lng;
    });
  },
  renderMarker: function(marker) {
    var self = this;
    marker.marker.addTo(redMarkers);
    marker.marker.on('dragend', function(){
      var temp = marker.marker.getLatLng();
      current_latitude = temp.lat;
      current_longitude = temp.lng;
    });
  }
}
