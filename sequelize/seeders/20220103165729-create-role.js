'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
<<<<<<< HEAD
      [
        {
          name: "admin",
        },
        {
          name: 'operator'
        },
        {
          name: 'driver'
        }
=======
      [ 
        { name: "admin" },
        {  name: 'operator'},
        { name: 'fakeRole'}
>>>>>>> develop
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Roles", null,{})

    
  }
};
