'use strict';

const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    hooks: {
      beforeCreate: (user) => {
        var salt = bcrypt.genSaltSync(8)
        user.salt = salt
        var hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      }
    }
  });
  return User;
};
