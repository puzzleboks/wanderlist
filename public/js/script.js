$(document).ready(function(){
  User.fetch().then(function(users){
    users.forEach(function(user){
      $(".users").append(user.username)
    })
  })
})
