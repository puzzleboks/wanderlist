$(document).ready(function() {

  $(".popup_bar").hide();
  $(".next_arrow").hide()
  $(".previous_arrow").hide()


  var lat     = 13.5333;
  var long    = 2.0833;

  $(".dropdown-toggle").on("click", function() {
    console.log("click");
  })

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets').setView([lat, long], 3);
  map.scrollWheelZoom.disable();

  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
  });

  /////////// nav bar clickdown //////////
  $(".dropdown-toggle").on("click", function(){
    console.log("menu bar clicked")
    $(".dropdown-menu").toggle();
  });

  //my account
  $(".my-account").on("click", function(){
    console.log("my acount clicked")
    $(".account-information").toggle();
  });
  //exiting account information
  $("#exit-button").on("click", function(){
    console.log("exit button clicked")
    $(".account-information").toggle();
  });
  //editing account information
  $("#edit-button").on("click", function(){
    console.log("exit button clicked")
    $(".account-information").toggle();
    alert("Your changes have been saved!")
  });

  //help
  $(".help").on("click", function(){
    console.log("help clicked")
    $(".help-message").toggle();
  });
  $("#exithelp-button").on("click", function(){
    console.log("exit button clicked")
    $(".help-message").toggle();
  });
  //sign out
  $(".sign-out").on("click", function(){
    console.log("sign out clicked")
  });
  //share link
  $(".share-link").on("click", function(){
    console.log("share clicked")
    alert("your link is www.wanderlistforever.com/OG")
  });

  // red and green pin variables

  var redPin = L.icon({
    iconUrl: '../public/images/PinDown1.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
  });
  var greenPin = L.icon({
    iconUrl: '../public/images/PinDown1Green.png',
    iconSize: [22, 27],
    iconAnchor: [4, 25],
  })

  //fetch pins from user 1

  Pin.fetch(1).then(function(pins){
    pins.forEach(function(pin){
      console.log(pin + " " + pin.title + " " + pin.latitude + " " + pin.longitude + " " + pin.id)
      if(pin.isRed == true){
        L.marker([pin.latitude, pin.longitude], {
          icon: redPin,
          draggable: true,
          clickable: true,
          title: pin.title + " id" + pin.id
        }).addTo(map);
      }
      else {
        L.marker([pin.latitude, pin.longitude], {
          icon: greenPin,
          clickable: true,
          title: pin.title + " id" + pin.id
        }).addTo(map);
      }
    })
  })

  // add search bar functionality to add red pin

  $(".form-control").on("keypress", function(e){
    if(e.which == 13){
      e.preventDefault();
      var user_search = $(".form-control").val()
      console.log("user_search is "+user_search)
      var request = $.getJSON("https://api.mapbox.com/v4/geocode/mapbox.places/"+user_search+".json?access_token=pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog")
      .then(function(response){
        console.log(response)
        var search_location = response.features[0].geometry.coordinates
        console.log(search_location)
        L.marker([search_location[1], search_location[0]], {
          icon: redPin,
          draggable: true
        }).addTo(map)
      }).fail(function(response){
        console.log("failed to load coordinates from search");
      })
      $(".form-control").val("")
    }
  })

  // add green and red pin drop and drag

  var redMarker = L.marker([lat, long], {
    icon: redPin,
    draggable: true,
    clickable: true
  });
  var greenMarker = L.marker([lat, long], {
    icon: greenPin,
    draggable: true,
    clickable: true
  });
  $("#redPinBtn").click(function(){
    console.log("click")
    redMarker.addTo(map);
  });
  $("#greenPinBtn").click(function() {
    console.log("greenclick")
    greenMarker.addTo(map);
  });

  // every time the marker is dragged, update the coordinates container
  redMarker.on("dragEnd", onDragEnd)

  // Set the initial marker coordinate on load.
  onDragEnd();

  function onDragEnd() {
    var gm = redMarker.getLatLng();
    console.log(gm.lat);
    console.log(gm.lng);

    var rm = greenMarker.getLatLng();
    console.log(rm.lat);
    console.log(rm.lng);
    //coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
  }
  // add and remove sidebar on pin click

  $(".leaflet-tile-pane").on("click", function() {
    $(".popup_bar").hide();
  })

  $(".leaflet-marker-pane").on("click", function() {
    if($(".popup_bar").css("display") == "none"){
      $(".popup_bar").toggle();
    }
    else {
      console.log("Already showing");
    }
    var temp = event.target.title.split(" id")
    var pinId = temp[1]
    var pinTitle = temp[0]
    var photoUrls = []
    var whichPhotoCounter = 0;
    Pin.show(1, pinId).then(function(response){
      $(".title").html(response.title);
      $(".description").html(response.description);
      // divCreator.html("<div>"+response.title+"</div>")
      // divCreator.html("<div>"+response.description+"</div>")
    })
    Pin.getPhotos(pinId).then(function(response){
      for(var i = 0; i < response.length; i++){
        photoUrls.push(response[i].photoUrl);
      }
    })
    .then(function(response){
      if (photoUrls.length == 0) {
        $(".next_arrow").hide()
        $(".previous_arrow").hide()

        $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' value='Enter Photo URL' class='changeUrl'></div>'")
      }
      else {
        $(".photos").html("<img src="+photoUrls[whichPhotoCounter]+">")
        $(".next_arrow").show()
        $(".next_arrow").on("click", function(){
          $(".previous_arrow").show()
          whichPhotoCounter++;
          if(photoUrls[whichPhotoCounter]){
            $(".photos").html("<img src="+photoUrls[whichPhotoCounter]+">")
          }
          else {
            $(".next_arrow").hide()
            $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' value='Enter Photo URL' class='changeUrl'></div>'")
          }
        })
        $(".previous_arrow").on("click", function() {
          $(".next_arrow").show()
          whichPhotoCounter--;
          if(whichPhotoCounter == 0){
            $(".previous_arrow").hide()
          }
          if(photoUrls[whichPhotoCounter]){
            $(".photos").html("<img src="+photoUrls[whichPhotoCounter]+">")
          }
          else {
            $(".previous_arrow").hide()
            $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' value='Enter Photo URL' class='changeUrl'></div>'")
          }

        })

      }
      // $(".popup_bar").html(divCreator)
    })
  })

});
