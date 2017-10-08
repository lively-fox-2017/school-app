'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {isEmail:true}
    },
    createdAt: new Date(),
    updatedAt: new Date()
  })
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'})
    Student.hasMany(models.StudentSubject)
  }
  return Student;
};
