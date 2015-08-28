var MapView = function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  this.map = L.mapbox.map('map', 'mapbox.streets').setView([13.5333, 2.0833], 3);
  this.map.scrollWheelZoom.disable();


}

MapView.prototype = {
  renderMarker: function(marker) {
    var self = this;
    console.log(marker)
    marker.marker.addTo(self.map)
    marker.marker.on('dragend', function(){
      var temp = marker.marker.getLatLng();
      console.log(temp.lat);
      console.log(temp.lng);
    });
  }
}
