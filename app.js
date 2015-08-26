var express = require("express"); //express app
var app = express(); //namespacing express object output
var bodyParser = require("body-parser"); //for form submissions
var path = require("path"); // if I remember correctly, only allows calling of files within project dir

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./controllers/users");
var pinsController = require("./controllers/pins");
var photosController = require("./controllers/photos");
var sessionsController = require("./controllers/sessions")

app.get("/", function(req, res){
  res.render("index", {})
});

app.use("/", usersController);
app.use("/", pinsController);
app.use("/", photosController);
app.use("/", sessionsController);

app.listen(3000, function(){
  console.log("app listening on port 3000")
})
