var PinView = function(pin){
  this.pin = pin;
  this.render();
}
PinView.prototype = {
  render: function(){
    var self = this;
    if(self.isRed == true){
      L.marker([self.latitude, self.longitude], {
        icon: redPin,
        draggable: true,
        clickable: true,
        title: self.title + " id" + self.id
      }).addTo(map);
    }
    else {
      L.marker([self.latitude, self.longitude], {
        icon: greenPin,
        clickable: true,
        title: self.title + " id" + self.id
      }).addTo(map);
    }
  }
}

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
