module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("pin", {
    title: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    isRed: DataTypes.STRING,
    description: DataTypes.TEXT
  })
  return model;
}
