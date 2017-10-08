'use strict';
const getFullName = require('../helpers/getFullName');
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email Address is Invalid. Please Re-submit Teacher'
        },
        isUnique: function(value, next) {
          Teacher.findOne({
              where: {
                email: value,
                id: {
                  [sequelize.Op.not]: this.id,
                }
              }
            })
            .then((found) => {
              if (found) {
                return next('Email Address already been used. Please Re-submit Teacher');
              }
              return next();
            })
            .catch(reason => {
              console.log(reason);
            });
        }
      }
    },
    subjectId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Teacher.associate = function(model) {
    Teacher.belongsTo(model.Subject, {
      foreignKey: 'subjectId',
      sourceKey: 'id'
    });
  };
  // Instance Method
  Teacher.prototype.getFullName = function() {
    return getFullName(this.first_name, this.last_name);
  }
  return Teacher;
};
