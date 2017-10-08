'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    studentId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    score: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Score is invalid. Score should be unsigned real number',
        }
      },
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  StudentSubject.associate = function(model) {
    StudentSubject.belongsTo(model.Student, {
      foreignKey: 'studentId',
      sourceKey: 'id',
    });
    StudentSubject.belongsTo(model.Subject, {
      foreignKey: 'subjectId',
      sourceKey: 'id'
    })
  };
  return StudentSubject;
};
