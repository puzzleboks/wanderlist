var SidebarView = function(pinId){
  this.pinId = pinId;
}

SidebarView.prototype = {
  render: function() {
    $(".popup_bar").show();
    if(!this.pinId){
      console.log("no pin")
    }
    Pin.getInfo(this.pinId).then(function(response){
      $(".title").html("<span class='clickable_title'>"+response.title+"</span>");
      $(".description").val(response.description);
    })
  }
}
