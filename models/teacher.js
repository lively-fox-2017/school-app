'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER
  });
  Teacher.prototype.getFullname = function() {
    return [this.first_name, this.last_name].join(' ');
  };
  Teacher.associate = model => {
    Teacher.belongsTo(model.Subject)
  }
  return Teacher;
};