var express = require("express");
var router = express.Router();
var Pin = require("../db/connection").models.Pin;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/pins", function(req,res){
  Pin.findAll().then(function(pins){
    res.json(pins);
  });
})


module.exports = router;
