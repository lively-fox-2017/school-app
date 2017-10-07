'use strict';
module.exports = function(sequelize, DataTypes) {
  	var Subject = sequelize.define('Subject', {
    	subject_name: DataTypes.STRING
	});
	Subject.associate = model => {
	    Subject.hasMany(model.Teacher, {foreignKey:'SubjectId'})
	    Subject.hasMany(model.StudentSubject, {foreignKey:'SubjectId'})
	    Subject.belongsToMany(model.Student, {through:'StudentSubject'})
   } 
  return Subject;
};