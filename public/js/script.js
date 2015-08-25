$(document).ready(function(){
  $(".popup_bar").hide();
  var lat     = 13.5333;
  var long    = 2.0833;

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);

  var myLayer = L.mapbox.featureLayer().addTo(map);

// myLayer.on("click", function(){
//   $(".popup_bar").toggle();
//   $(".popup_bar").html($(event.target).attr("class"));
//   console.log($(event.target))
//   // if($(this).attr("class") == "potato"){
//   //   console.log("potato")
//   // }
//   // else{
//   //   console.log("womp womp")
//   // }
//   //
//
//   // $(".popup_bar").toggle();
//   // $(".popup_bar").empty()
//   // $(".popup_bar").html("<p>"+this["_geojson"][0]["properties"]["title"]+"</p>")
//   // console.log(this["_geojson"][0]["properties"]["title"])
// })

map.scrollWheelZoom.disable();

/////////////// adding original pins of user 1 /////////////
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

  /////////////search bar///////////////////

  $(".form-control").on("keypress", function(e){
    if(e.which == 13){
      e.preventDefault();
      var user_search = $(".form-control").val()
      var request = $.getJSON("https://api.mapbox.com/v4/geocode/mapbox.places/"+user_search+".json?access_token=pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog")
      .then(function(response){
        var search_location = response.features[0].geometry.coordinates

        console.log(search_location)

        geoJson.push(
          {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [search_location[0], search_location[1]]
            },
            "properties": {
                "title": user_search,
                "description": response.features[0].text,
                "icon": {
                    "iconUrl": "../public/images/PinDown1.png",
                    "iconSize": [22, 27], // size of the icon
                    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": "true"
                }
            }
          }
        )
        myLayer.on('layeradd', function(e) {
            var marker = e.layer,
                feature = marker.feature;

            marker.setIcon(L.icon(feature.properties.icon));
        });
        myLayer.setGeoJSON(geoJson);
      })
      $(".form-control").val("")
      console.log("-------------geoJSON----------")
      console.log(geoJson)
      console.log("user pressed enter")
    }
  })
  // users/1/pins gets a json list of that user's pins

  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
  });
});
