$(document).ready(function(){
  $(".popup_bar").hide();
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

  // User.fetch().then(function(users){
  //   users.forEach(function(user){
  //     $(".users").append(user.username)
  //   })
  // })

  Pin.fetch(1).then(function(pins){
    pins.forEach(function(pin){
      var view = new PinView(pin)
      $("body").append("<div>"+pin+"</div>")
    })
  })


  // users/1/pins gets a json list of that user's pins


});
