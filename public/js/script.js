$(document).ready(function() {
//define current_user variable through ajax
Pin.whichUser().then(function(userId){
  current_user = userId;
})


  $(".popup_bar").hide();
  $(".next_arrow").hide()
  $(".previous_arrow").hide()
  $(".saveButton").hide();
  $(".deletePhotoButton").hide();

  var newPin = false;
  var pinId;
  var whichPin;
  var colorPin;
  var pinLat = 13.5333;
  var pinLong = 2.0833;

  //load map
  var WorldMap = new MapView();

  $("body").click(function(){
    $(".overlay").hide();
    $(".help_window").hide();
  });

  //fetch pins from user defined by session with default of 1 if no session

  Pin.fetch().then(function(pins){
    pins.forEach(function(pin){
      var marker = new PinView(pin);
      WorldMap.renderMarker(marker)
      // WorldMap.renderMarker(view.marker)
    })
  })

  //  add search bar functionality to add red pin

  $(".form-control").on("keypress", function(e){
    if(e.which == 13){
      e.preventDefault();
      var user_search = $(".form-control").val()
      console.log("user_search is "+user_search)
      var request = $.getJSON("https://api.mapbox.com/v4/geocode/mapbox.places/"+user_search+".json?access_token=pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog")
      .then(function(response){
        var search_location = response.features[0].geometry.coordinates
        var lat = search_location[1];
        var long = search_location[0];
        var pin = new Pin({
          "latitude": lat,
          "longitude": long,
        })
        var marker = new PinView(pin);
        WorldMap.renderMarker(marker)
      }).fail(function(response){
        console.log("failed to load coordinates from search");
      })
      $(".form-control").val("")
      newPinWindow()
    }
  })

  $("#redPinBtn").click(function(){
    var pin = new Pin({})
    var marker = new PinView(pin);
    WorldMap.renderMarker(marker)
  });
  $("#greenPinBtn").click(function() {
    var pin = new Pin({"isRed": "false"})
    var marker = new PinView(pin);
    WorldMap.renderMarker(marker)
  });

  $(".leaflet-marker-pane").on("click", function() {
    var photoUrls = []
    var whichPhotoCounter = 0;
    if(pinId){        
      Pin.getPhotos(pinId).then(function(response){
        console.log(response)
        if (response.length == 0) {
          $(".next_arrow").hide()
          $(".previous_arrow").hide()

          $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' placeholder='Enter Photo URL' class='changeUrl'></div>'")
        }
        else {
          $(".deletePhotoButton").show();
          $(".deletePhotoButton").on("click", function() {
            photoId = response[whichPhotoCounter].id
            $.ajax({
              url: "/pins/" + pinId + "/photos/" + photoId,
              type: "DELETE",
              dataType: "json",
            }).done(function(response){
              // placeholder $(".photos").html("<img src='"+ response.photoUrl +"' >")
            })
          });

          $(".photos").html("<img src="+response[whichPhotoCounter].photoUrl+">")
          $(".next_arrow").show()
          $(".next_arrow").on("click", function(){
            $(".previous_arrow").show()
            whichPhotoCounter++;
            if(response[whichPhotoCounter]){
              $(".photos").html("<img src="+response[whichPhotoCounter].photoUrl+">")
            }
            else {
              $(".next_arrow").hide()
              $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' placeholder='Enter Photo URL' class='changeUrl'></div>'")
            }
          })
          $(".previous_arrow").on("click", function() {
            $(".next_arrow").show()
            whichPhotoCounter--;
            if(whichPhotoCounter == 0){
              $(".previous_arrow").hide()
            }
            if(response[whichPhotoCounter]){
              $(".photos").html("<img src="+response[whichPhotoCounter].photoUrl+">")
            }
            else {
              $(".previous_arrow").hide()
              $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' placeholder='Enter Photo URL' class='changeUrl'></div>'")
            }

          })

        }
        // $(".popup_bar").html(divCreator)
      })
    }
    // if a new pin, then do the following////
    else {
      newPinWindow();
    }

  })
  function newPinWindow() {
    newPin = true;
    if($(".popup_bar").css("display") == "none"){
      $(".popup_bar").toggle();
    }
    $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' placeholder='Enter Photo URL' class='changeUrl'></div>'")
    $(".title").html("<input type='text' placeholder='New Pin'>");
    $(".description").val("What is on the agenda?")
    console.log("The window thinks the lat/long is "+pinLat + " " + pinLong)
    $(".saveButton").show()
  }
  $(".saveButton").on("click", function() {
    newPin = false;
    console.log(whichPin)
    var title = $(".title").children().eq(0).val()
    var latitude = pinLat;
    var longitude = pinLong;
    if(colorPin == "red"){
      isRed = true;
    }
    else {
      isRed = false;
    }
    var description = $(".description").val()
    // console.log($(".description").children())
    Pin.whichUser().then(function(userId){
      $.ajax({
        url: "http://localhost:3000/users/"+userId+"/pins",
        type: "POST",
        dataType: "json",
        data: {"title": title, "latitude": latitude, "longitude": longitude, "userId": userId, "isRed": isRed, "description": description}
      }).done(function(response){
        console.log("----------")
        console.log(whichPin)
        whichPin.title = response.title + " id" + response.id
        $(".saveButton").hide;
        $(".title").html(response.title);
        $(".description").html(response.description);
        var pinId = response.id;
        var pict = $(".changeUrl").val();
        $.ajax({
          url: "/pins/" + pinId + "/photos",
          type: "POST",
          dataType: "json",
          data: {"photoUrl": pict, "pinId": pinId}
        }).done(function(response){
          $(".photos").html("<img src='"+ response.photoUrl +"' >")

        })
        //console.log(pict);
      }).fail(function(response){
        console.log("post to pin failed");
      })
    })
  })
})
