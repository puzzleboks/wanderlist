var DB = require("./connection");

var bcrypt = require('bcryptjs');

DB.models.User.create({username: "testuser", password_digest: bcrypt.hashSync('password', 8)})
.done(function(){DB.models.Pin.create({title: "London, UK", latitude: 51.5072, longitude: -0.1275, userId: 1, isRed: true, description: "This was my wondeful trip to the UK. It was amazing in every way. The end."})
.done(function(){DB.models.Photo.create({photoUrl: "https://d185ox70mr1pkc.cloudfront.net/post_image/london.jpg", pinId: 1})
.done(function(){DB.models.Pin.create({title: "Beijing", latitude: 39.9167, longitude: 116.3833, userId: 1, isRed: true, description: "Yay Beijing"})
.done(function(){DB.models.Pin.create({title: "Rio De Janeiro", latitude: -22.9068, longitude: -43.1729, userId: 1, isRed: true, description: "Yay Rio"})
.done(function(){DB.models.Pin.create({title: "Maui", latitude: 20.8000, longitude: -156.3333, userId: 1, isRed: true, description: "Yay Maui"})
.done(function(){DB.models.Pin.create({title: "DC", latitude: 38.9047, longitude: -77.0164, userId: 1, isRed: false, description: "Yay DC"})
.done(function(){DB.models.Pin.create({title: "Tampa", latitude: 27.9681, longitude: -82.4764, userId: 1, isRed: false, description: "Boo Tampa"})

.done(function(){process.exit();})

})})})})})})})
