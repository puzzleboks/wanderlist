module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define("user", {
    // id: DataTypes.STRING,
    token: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING
    // username: DataTypes.STRING,
    // password_digest: DataTypes.STRING
  })
  return model;
}
