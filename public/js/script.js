$(document).ready(function(){
  $(".popup_bar").hide();
  var lat     = 13.5333;
  var long    = 2.0833;

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);

  var myLayer = L.mapbox.featureLayer().addTo(map);

myLayer.on("click", function(){
  $(".popup_bar").toggle();
  $(".popup_bar").html($(event.target).attr("class"));
  console.log($(event.target))
  // if($(this).attr("class") == "potato"){
  //   console.log("potato")
  // }
  // else{
  //   console.log("womp womp")
  // }
  //

  // $(".popup_bar").toggle();
  // $(".popup_bar").empty()
  // $(".popup_bar").html("<p>"+this["_geojson"][0]["properties"]["title"]+"</p>")
  // console.log(this["_geojson"][0]["properties"]["title"])
})

map.scrollWheelZoom.disable();

  var geoJson = []
  Pin.fetch(1).then(function(pins){
    pins.forEach(function(pin){
      if(pin.isRed == true){
        console.log("------")
        console.log(pin.title);
        console.log(pin.latitude);
        console.log(pin.longitude);
        geoJson.push(
          {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [pin.longitude, pin.latitude]
            },
            "properties": {
                "title": pin.title,
                "description": pin.description,
                "icon": {
                    "iconUrl": "../public/images/PinDown1.png",
                    "iconSize": [22, 27], // size of the icon
                    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": pin.isRed
                }
            }
          }
        )
      }
      else {
        console.log("------")
        console.log(pin.title);
        console.log(pin.latitude);
        console.log(pin.longitude);
        geoJson.push(
          {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [pin.longitude, pin.latitude]
            },
            "properties": {
                "title": pin.title,
                "description": pin.description,
                "icon": {
                    "iconUrl": "../public/images/PinDown1Green.png",
                    "iconSize": [22, 27], // size of the icon
                    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": pin.isRed
                }
            }
          }
        )
      }
    })
  }).then(function(){
    myLayer.on('layeradd', function(e) {
        var marker = e.layer,
            feature = marker.feature;

        marker.setIcon(L.icon(feature.properties.icon));
    });

    myLayer.setGeoJSON(geoJson);
  })
});
