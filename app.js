// set up =====================================================================
// get all the tools we need
var express = require("express"); //express app
var app = express(); //namespacing express object output
var bodyParser = require("body-parser"); //for form submissions
var path = require("path"); // if I remember correctly, only allows calling of files within project dir
var passport = require('passport')//for user authentication
var LocalStrategy = require('passport-local').Strategy;
var flash = require("connect-flash");//allows for passing session flashdata messages
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");

// set up our express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'theworldisourclam', resave: false, saveUninitialized: false })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.listen(3000, function(){
  console.log("app listening on port 3000")
})

var usersController = require("./controllers/users");
var pinsController = require("./controllers/pins");
var photosController = require("./controllers/photos");

app.use("/", usersController);
app.use("/", pinsController);
app.use("/", photosController);

// passport config
//var Account = require('./models/user');//change later?
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());


app.get("/", function(req, res){
  res.render("index", {})
});
