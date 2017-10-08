'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })
  Subject.associate = function(models){
    Subject.hasMany(models.Teacher, {foreignKey: 'SubjectsId'})
    Subject.belongsToMany(models.Student,{through:'SubjectStudent'})
    Subject.hasMany(models.SubjectStudent)
  }
  return Subject;
};
