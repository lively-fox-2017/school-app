'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentSubjects', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        studentId: {
          type: Sequelize.INTEGER
        },
        subjectId: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addConstraint(
          'StudentSubjects', ['studentId'], {
            type: 'FOREIGN KEY',
            name: 'studentsubject_studentid_foreign',
            references: {
              table: 'Students',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
          }
        )
      })
      .then(() => {
        return queryInterface.addConstraint(
          'StudentSubjects', ['subjectId'], {
            type: 'FOREIGN KEY',
            name: 'studentsubject_subjectid_foreign',
            references: {
              table: 'Subjects',
              field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
          }
        )
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
        'StudentSubjects', 'studentsubject_subjectid_foreign'
      )
      .then(() => {
        return queryInterface.removeConstraint(
          'StudentSubjects', 'studentsubject_studentid_foreign'
        )
      })
      .then(() => {
        return queryInterface.dropTable('StudentSubjects')
      });
  }
};
