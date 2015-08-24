$(document).ready(function(){
  User.fetch().then(function(users){
    users.forEach(function(user){
      $(".users").append(user.username)
    })
  })
  L.mapbox.accessToken = 'pk.eyJ1IjoiYWxleGJhbm5vbiIsImEiOiIzM2I3MWU4NjhlNjc5ODYzN2NjMWFhYzU4OWIzOGYzYiJ9.zVY-I01f5Pie1XCaA0Laog';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40, -74.50], 9);

})
