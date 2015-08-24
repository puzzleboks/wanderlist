var express = require("express");
var router = express.Router();
var Pin = require("../db/connection").models.Pin;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

module.exports = router;
