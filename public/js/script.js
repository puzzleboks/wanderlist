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
        console.log(pin)
        console.log(pin.title);
        console.log(pin.latitude);
        console.log(pin.longitude);
        console.log("pin id: " + pin.id)
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
                    "iconAnchor": [4, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": pin.isRed +" id"+ pin.id //faking adding id to mapbox geojson with unique class name
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
                    "iconAnchor": [4, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": pin.isRed +" "+ pin.id
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
                    "iconAnchor": [4, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": "true "+ pin.id
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

  ///////////// help window ///////////////
  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
    $(".popup_bar").hide();
  });

  /////////// nav bar clickdown //////////
  // $(".caret").click(function(){
  //   console.log("menu bar clicked")
  //   $(".dropdown-menu").show();
  // });
  // $(".dropdown-toggle").show(;)
  //     alert("First handler for .toggle() called.");
  //     $(".dropdown-menu").show();
    }
    // function() {
    //   alert( "Second handler for .toggle() called." );
    // });
  ///////////// pin click ////////////////
  myLayer.on("click", function() {
    // var coords = e.layer.feature.geometry.coordinates;

    if($(".popup_bar").css("display") == "none"){
      $(".popup_bar").toggle();
    }
    else {
      console.log("Already showing");
    }
    console.log(this.getGeoJSON())
    console.log(this);
    console.log(event.target)
  })

  //////////// pin drag test ////////////
  // myLayer.on('layeradd', function(e) {
  //   L.marker(new L.LatLng(25.7753,80.2089), {
  //     icon: L.mapbox.marker.icon(e.myLayer.feature.properties.icon),
  //     draggable: true
  //   })
  //   .on('dragend', function(e){
  //     console.log(e);
  //   })
  //   .addTo(map);
  // });

  // myTestLayer.eachLayer(function(e){
  //   var coords = e.myTestLayer.feature.geometry.coordinates;
  //   console.log(coords);
  // });

  // myLayer.eachLayer(function(m) {
  //   var coords = m.myLayer.geometry.coordinates;
  //   console.log("fuck");
  //   console.log(coords);
  //   L.marker(new L.LatLng(coords[1], coords[0]), {
  //     icon: L.mapbox.marker.icon(m.myLayer.properties),
  //     draggable: true
  //   })
  //   .on('dragend', function(m) {
  //       console.log(m);
  //   })
  //   .addTo(map);
  // });
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
  var marker = L.marker([64.92354174306496, 103.18359375], {
    icon: myIcon,
    draggable: true
  });
  $("#redPinBtn").click(function(){
    marker.addTo(map);
  });

  // every time the marker is dragged, update the coordinates container
  marker.on('dragend', ondragend);

  // Set the initial marker coordinate on load.
  ondragend();

  function ondragend() {
    var m = marker.getLatLng();
    console.log(m.lat);
    console.log(m.lng);
    //coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
  }

});
