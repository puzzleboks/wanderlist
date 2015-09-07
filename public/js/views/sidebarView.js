var SidebarView = function(pinId){
  this.pinId = pinId;
}

SidebarView.prototype = {
  render: function() {
    $(".popup_bar").show();
    if(this.pinId == "?"){
      $(".popup_bar").show();
      $(".saveButton").show()
      $(".photos").html("<img class='changePhotoToOpaque' src='http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-park.jpg'><div class='changeUrlBar'><input type='text' placeholder='Enter Photo URL' class='changeUrl'></div>'")
      $(".title").html("<input type='text' placeholder='New Pin'>");
      $(".description").val("What is on the agenda?")
    }
    else{
      Pin.getInfo(this.pinId).then(function(response){
        $(".clickable_title").html(response.title);
        $(".description").val(response.description);
      })
    }
  },

  closeSidebar: function() {
    var title = $(".title").html()

    $(".popup_bar").hide();

  }
}
