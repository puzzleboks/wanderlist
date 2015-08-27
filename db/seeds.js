var DB = require("./connection");

var bcrypt = require('bcryptjs');

DB.models.User.create({username: "testuser", password_digest: bcrypt.hashSync('password', 8)})
.done(function(){DB.models.Pin.create({title: "London, UK", latitude: 51.5072, longitude: -0.1275, userId: 1, isRed: true, description: "This was my wondeful trip to the UK. It was amazing in every way. The end."})
.done(function(){DB.models.Photo.create({photoUrl: "https://d185ox70mr1pkc.cloudfront.net/post_image/london.jpg", pinId: 1})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/570/400", pinId: 1})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/400/450", pinId: 1})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/654/449", pinId: 1})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/888/777", pinId: 1})
.done(function(){DB.models.Pin.create({title: "Beijing", latitude: 39.9167, longitude: 116.3833, userId: 1, isRed: true, description: "Yay Beijing"})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/350/350", pinId: 2})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/444/444", pinId: 2})
.done(function(){DB.models.Pin.create({title: "Rio De Janeiro", latitude: -22.9068, longitude: -43.1729, userId: 1, isRed: true, description: "Yay Rio"})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/666/555", pinId: 3})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/555/666", pinId: 3})
.done(function(){DB.models.Pin.create({title: "Maui", latitude: 20.8000, longitude: -156.3333, userId: 1, isRed: true, description: "Yay Maui"})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/950/456", pinId: 4})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.fillmurray.com/567/765", pinId: 4})
.done(function(){DB.models.Pin.create({title: "DC", latitude: 38.9047, longitude: -77.0164, userId: 1, isRed: false, description: "Yay DC"})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.placebear.com/600/600", pinId: 5})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.placebear.com/700/600", pinId: 5})
.done(function(){DB.models.Pin.create({title: "Tampa", latitude: 27.9681, longitude: -82.4764, userId: 1, isRed: false, description: "Boo Tampa"})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.placebear.com/567/765", pinId: 6})
.done(function(){DB.models.Photo.create({photoUrl: "http://www.placebear.com/765/567", pinId: 6})

.done(function(){process.exit();})

})})})})})})})})})})})})})})})})})})})})})
