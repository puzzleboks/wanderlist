var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;
var env = require("./env");
var path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");
app.use(express.static("public"))

var usersController = require("./controllers/users");
var pinsController = require("./controllers/pins");
var photosController = require("./controllers/photos");

app.use("/", usersController);
app.use("/", pinsController);
app.use("/", photosController);

app.get("/", function(req, res){
  res.render("index", {})
});

passport.use(new TwitterStrategy(
  {
    consumerKey: env.twitter.consumerKey,
    consumerSecret: env.twitter.consumerSecret,
    callbackURL: env.twitter.callbackUrl
  },
  function(token, tokenSecret, profile, cb){
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// app.get("/", function(req, res) {
//   res.send("<a href='/auth/twitter/login'>Login</a>");
// });

app.get("/auth/twitter/login", passport.authenticate("twitter"));

app.get("/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/auth/twitter/show");
  }
);

app.get("/auth/twitter/show", function(req, res){
  res.json(req.session);
});

app.get('/signout', function(req, res){
  req.session.destroy()
  res.redirect("/users")
})

// app.get("/", function(req, res){
//   res.render("index", {})
// });

app.listen(3000, function(){
  console.log("Whee, I'm working!");
});





// var methodOverride = require('method-override')
// var session = require("express-session")
// app.use(methodOverride('_method'))
// app.use(session({
//   secret: "keyboard cat",
//   key: "sid",
//   cookie: { secure:true }
// }))
// var TwitterStrategy = require("passport-twitter").Strategy

// passport.use(new TwitterStrategy({
//   consumerKey: env.twitter.consumerKey,
//   consumerSecret: env.twitter.consumerSecret,
//   callbackUrl: env.twitter.callbackUrl
// }, function(aToken, aTokenSecret, aProfile, done){
//   console.log("token", aToken)
//   token = aToken
//   TokenSecret = aTokenSecret
//   profile = aProfile
//   done(null, profile)
// }))
//
// app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res){
// });
// // var sessionsController = require("./controllers/sessions")

// // app.use("/", sessionsController);
