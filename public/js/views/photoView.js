var PhotoView = function(pinId, photoId){
  var self = this;
  $.getJSON("/pins/"+pinId+"/photos/"+photoId)
  .done(function(response){
    self.photoUrl = response.photoUrl;
    self.pinId = response.pinId;
    $(".photos").html("<img src='"+self.photoUrl+"'>");
  })
}
