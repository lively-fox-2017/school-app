'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          msg:"Email not valid!"
        },
        isUnique: (value,res) => {
          Student.findOne({where: {email: value}}).then(student => {
            if(student) {
              return res('Email already in use!');
            } else {
              return res();
            }
          }).catch(err => {
            return res(err);
          });
        }        
      }
    }
  });
  Student.associate = model => {
    Student.hasMany(model.StudentSubject, {foreignKey:'StudentId'})
    Student.belongsToMany(model.Subject, {through:'StudentSubject'})
  }
  Student.prototype.getFullname = function() {
    return [this.first_name, this.last_name].join(' ');
  };
  return Student;
};