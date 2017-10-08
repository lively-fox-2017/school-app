'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'Teachers',
      'subjectId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    ).then(() => {
      return queryInterface.addConstraint(
        'Teachers', ['subjectId'], {
          type: 'FOREIGN KEY',
          name: 'teachers_subjectid_foreign',
          references: { //Required field
            table: 'Subjects',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeConstraint('Teachers',
        'teachers_subjectid_foreign')
      .then(() => {
        return queryInterface.removeColumn('Teachers',
          'subjectId')
      });
  }
};
