var express = require("express"); //express app
var app = express(); //namespacing express object output
var bodyParser = require("body-parser"); //for form submissions
var path = require("path"); // if I remember correctly, only allows calling of files within project dir

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

app.listen(3000, function(){
  console.log("app listening on port 3000")
})

var usersController = require("./controllers/users");
var pinsController = require("./controllers/pins");
var photosController = require("./controllers/photos");
// var sessionsController = require("./controllers/sessions")

app.use("/", usersController);
app.use("/", pinsController);
app.use("/", photosController);
// app.use("/", sessionsController);


app.get("/", function(req, res){
  res.render("index", {})
});

// /////Twitter OAuth/////
var methodOverride = require('method-override')
var env = require("./env")
var session = require("express-session")
var passport = require("passport")

app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(session({
  secret: "keyboard cat",
  key: "sid",
  cookie: { secure:true }
}))
var TwitterStrategy = require("passport-twitter").Strategy
passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(obj, done){
  done(null, obj)
})
app.use(passport.initialize())
app.use(passport.session())

passport.use(new TwitterStrategy({
  consumerKey: env.consumerKey,
  consumerSecret: env.consumerSecret,
  callbackUrl: env.callbackUrl
}, function(aToken, aTokenSecret, aProfile, done){
  token = aToken
  TokenSecret = aTokenSecret
  profile = aProfile
  done(null, profile)
}))

app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res){
});

app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res){
  req.session.token = token
  req.session.tokenSecret = tokenSecret
  req.session.profile = profile
  res.redirect("/users")
});

app.get('/signout', function(req, res){
  req.session.destroy()
  res.redirect("/users")
})
