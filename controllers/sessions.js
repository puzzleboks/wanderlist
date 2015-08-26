var passport = require("passport")
var express = require("express");
var app = express(); //namespacing express object output

var router = express.Router();
var methodOverride = require('method-override')
var env = require("../env")
var session = require("express-session")
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(session({
  secret: "ninja please"
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


router.get("/auth/twitter", passport.authenticate("twitter"), function(req, res){
})

router.get("/auth/twitter/callback", passport.authenticate('twitter'), function(req, res){
  req.session.token = token
  req.session.tokenSecret = tokenSecret
  req.session.profile = profile
  res.redirect("/users")
})

router.get("/signout", function(req, res){
  req.session.destroy()
  res.redirect("/users")
})



module.exports = router;
