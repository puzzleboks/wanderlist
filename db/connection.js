var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///wanderlist");
var User = sequelize.import("../models/user");
var Pin = sequelize.import("../models/pin");
var Photo = sequelize.import("../models/photo");

User.hasMany(Pin);
Pin.belongsTo(User);
Pin.hasMany(Photo);
Photo.belongsTo(Pin);

module.exports = {
  sql: Sequelize,
  do: sequelize,
  models: {
    User: User,
    Pin: Pin,
    Photo: Photo
  }
}
