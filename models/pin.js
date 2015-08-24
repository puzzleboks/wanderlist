module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("pin", {
    title: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    isRed: DataTypes.BOOLEAN,
    description: DataTypes.TEXT
  })
  return model;
}
