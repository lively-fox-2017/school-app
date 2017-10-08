'use strict';

const Fullname = require('../helper/fullname')

module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    // email: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {isEmail:true}
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    SubjectId: DataTypes.INTEGER
  })
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  }
  Teacher.prototype.fullname = function(){
    // return Fullname.fullname(this.first_name,this.last_name)
    return this.first_name + ' ' + this.last_name
  }
  return Teacher;
};
