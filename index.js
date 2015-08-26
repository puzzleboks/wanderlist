var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var usersController = require("./controllers/users");
var pinsController = require("./controllers/pins");
var photosController = require("./controllers/photos");

app.use("/", usersController);
app.use("/", pinsController);
app.use("/", photosController);

var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;
var fs = require("fs")
if (fs.existsSync("./env.js")){
  console.log("yes")
  var env = require("./env");
}
else {
  var env = process.env;
}
passport.use(new TwitterStrategy(
  {
    consumerKey: env.twitterConsumerKey,
    consumerSecret: env.twitterConsumerSecret,
    callbackURL: env.twitterCallbackUrl
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
    // user = req.session.
    console.log(req.session.passport.user)

    user = User.new
    user.email = req.session.passport.user.email
    user.name = req.session.passport.user.name
    user.save

    res.redirect("/");
  }
);

currentUser = req.session

app.get("/auth/twitter/show", function(req, res){
  res.json(req.session);
});

app.get('/signout', function(req, res){
  req.session.destroy()
  res.redirect("/")
})

app.get("/", function(req, res){
  res.render("index", {})
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Whee, I'm working!");
});
