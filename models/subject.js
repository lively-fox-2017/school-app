'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Subject.associate = function(model) {
    Subject.hasMany(model.Teacher, {
      foreignKey: 'subjectId',
      sourceKey: 'id',
      as: 'Teachers'
    });
    Subject.hasMany(model.StudentSubject, {
      foreignKey: 'subjectId',
      sourceKey: 'id'
    });
    Subject.belongsToMany(model.Student, {
      through: 'StudentSubject',
      foreignKey: 'subjectId',
      otherKey: 'studentId',
    });
  };
  return Subject;
};
