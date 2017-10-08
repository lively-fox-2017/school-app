'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Teachers', [{
      first_name: 'Dr. Slump',
      last_name: 'Slumper',
      email: 'drslump@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Arale',
      last_name: 'Slumper',
      email: 'arale@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Makibau',
      last_name: 'Makibauo',
      email: 'makibau@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Teacher', null, {});
  }
};
