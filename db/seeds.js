var DB = require("./connection");

var bcrypt = require('bcryptjs');

DB.models.User.create({username: "testuser", password_digest: bcrypt.hashSync('password', 8)}).done(function(){process.exit();})
DB.models.Pin.create({title: "London, UK", latitude: 51.5072, longitude: -0.1275, userId: 1, isRed: true, description: "This was my wondeful trip to the UK. It was amazing in every way. The end."}).done(function(){process.exit();})
DB.models.Photo.create({photoUrl: "https://d185ox70mr1pkc.cloudfront.net/post_image/london.jpg", pinId: 1}).done(function(){process.exit();})
