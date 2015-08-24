module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("user", {
    username: DataTypes.STRING,
    password_digest: DataTypes.STRING
  })
  return model;
}
