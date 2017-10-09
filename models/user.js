'use strict';
const tools = require('../helper/tools')
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  },{
    hooks : {
      beforeCreate: (cb) => {
        let newPass = tools.cryptor(cb.salt,cb.password);
        cb.password = newPass;
      }
    }
  });
  return User;
};