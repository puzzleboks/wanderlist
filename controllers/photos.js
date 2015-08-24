var express = require("express");
var router = express.Router();
var Photo = require("../db/connection").models.Photo;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/photos", function(req,res){
  Photo.findAll().then(function(photos){
    res.json(photos);
  });
})


module.exports = router;
