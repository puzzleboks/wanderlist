var express = require("express");
var router = express.Router();
var Photo = require("../db/connection").models.Photo;
var Pin = require("../db/connection").models.Pin;


function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/photos", function(req,res){
  Photo.findAll().then(function(photos){
    res.json(photos);
  });
});

router.post("/photos", function(req, res){
  console.log(req.body);
  Photo.create(req.body).then(function(photo){
    console.log(photo);
    res.json(photo);
  });
});

router.get("/pins/:pinId/photos", function(req, res){
  Pin.findById(req.params.pinId).then(function(pin){
    pin.getPhotos().then(function(photos){
      res.send(photos)
    })
  });
});

router.get("/photos/:id", function(req, res){
  Photo.findById(req.params.id).then(function(photo){
    res.json(photo);
  });
});

router.patch("/photos/:id", function(req, res){
  Photo.findById(req.params.id).then(function(photo){
    photo.updateAttributes(req.body).then(function(updatedPhoto){
      res.json(updatedPhoto);
    });
  });
});

router.delete("/photos/:id", function(req, res){
  Photo.findById(req.params.id).then(function(photo){
    photo.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
