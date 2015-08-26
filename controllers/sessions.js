var passport = require("passport")
var express = require("express");
var app = express();
var router = express.Router();

//Twitter Oauth//
var methodOverride = require('method-override')
var env = require("../env")
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

router.get('/auth/twitter', passport.authenticate('twitter'), function(req, res){
});

router.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res){
  req.session.token = token
  req.session.tokenSecret = tokenSecret
  req.session.profile = profile
  res.redirect("/users")
});

router.get('/signout', function(req, res){
  req.session.destroy()
  res.redirect("/users")
})

//Google Oauth//
var util = require('util')

app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(session({
  secret: "keyboard cat",
  key: "sid",
  cookie: { secure:true }
}))

var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    consumerKey: env.consumerKey,
    consumerSecret: env.consumerSecret,
    callbackURL: env.callbackUrl
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;
