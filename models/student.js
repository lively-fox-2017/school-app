'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {isEmail:true}
    }
  })
  Student.associate = function(models){
    Student.belongsToMany(models.Subject,{through:'SubjectStudent'})
    Student.hasMany(models.SubjectStudent)
  }
  return Student;
};
