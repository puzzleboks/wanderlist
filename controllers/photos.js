var express = require("express");
var router = express.Router();
var Photo = require("../db/connection").models.Photo;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

module.exports = router;
