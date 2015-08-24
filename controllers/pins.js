var express = require("express");
var router = express.Router();
var Pin = require("../db/connection").models.Pin;
// var User = require("../db/connection").models.User;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/users/:id/pins", function(req, res){
  User.findById(req.params.userId).then(function(user){
    res.json(user.getPins());
  });
});

router.get("/pins", function(req,res){
  Pin.findAll().then(function(pins){
    res.json(pins);
  });
});

router.get("/pins/:id", function(req, res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    res.json(pin);
  });
});

router.patch("/pin/:id", function(req, res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    pin.updateAttributes(req.body).then(function(updatedPin){
      res.json(updatedPin);
    });
  });
});

router.delete("/pins/:id", function(req, res){
  Pin.findById(req.params.id).then(function(pin){
    if(!pin) return error(res, "not found");
    pin.destroy().then(function(){
      res.json({success: true});
    });
  });
});

module.exports = router;
