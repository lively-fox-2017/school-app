'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  })
  StudentSubject.associate = function(models) {
    StudentSubject.belongsTo(models.Student)
    StudentSubject.belongsTo(models.Subject)
  }
  
  return StudentSubject;
};
