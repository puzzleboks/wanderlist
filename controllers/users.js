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
})


module.exports = router;
