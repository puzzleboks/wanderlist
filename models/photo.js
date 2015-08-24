module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("photo", {
    photoUrl: DataTypes.STRING,
    pinId: DataTypes.INTEGER,
  })
  return model;
}
