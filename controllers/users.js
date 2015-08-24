var express = require("express");
var router = express.Router();
var User = require("../db/connection").models.User;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/users", function(req,res){
  User.findAll().then(function(users){
    res.json(users);
  });
});

router.get("/users/:id", function(req, res){
  User.findById(req.params.id).then(function(user){
    res.json(user);
  })
});

router.get("/users/:id/pins", function(req,res){
  User.findById(req.params.id).then(function(user){
    if(!user) return error(res, "user not found");
    user.getPins().then(function(pins){
      res.send(pins);
    })
  })
});





module.exports = router;
