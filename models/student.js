'use strict';
const getFullName = require('../helpers/getFullName');
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email Address is Invalid. Please Re-submit Student'
        },
        isUnique: function(value, next) {
          Student.findOne({
              where: {
                email: value,
                id: {
                  [sequelize.Op.not]: this.id,
                }
              }
            })
            .then((found) => {
              if (found) {
                return next('Email Address already been used. Please Re-submit Student');
              }
              return next();
            })
            .catch(reason => {
              console.log(reason);
            });
        }
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Student.associate = function(model) {
    Student.hasMany(model.StudentSubject, {
      foreignKey: 'studentId',
      sourceKey: 'id',
    });
    Student.belongsToMany(model.Subject, {
      through: 'StudentSubject',
      foreignKey: 'studentId',
      otherKey: 'subjectId',
    })
  };
  // Instance Method
  Student.prototype.getFullName = function() {
    return getFullName(this.first_name, this.last_name);
  }
  return Student;
};
