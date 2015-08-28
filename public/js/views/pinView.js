var PinView = function(pin){
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
  this.pin = pin;
  console.log(pin)
  if(pin.isRed == true){
    this.marker = L.marker([pin.latitude, pin.longitude], {
      icon: redPin,
      draggable: true,
      clickable: true,
      title: pin.title + " id" + pin.id
    })
  }
  else {
    this.marker = L.marker([pin.latitude, pin.longitude], {
      icon: greenPin,
      clickable: true,
      draggable: true,
      title: pin.title + " id" + pin.id
    })
  }
}

PinView.prototype = {
  render: function() {

  }
}
