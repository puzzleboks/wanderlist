module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("pin", {
    title: DataTypes.STRING,
    latLong: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    isRed: DataTypes.BOOLEAN,
    description: DataTypes.TEXT
  })
  return model;
}
