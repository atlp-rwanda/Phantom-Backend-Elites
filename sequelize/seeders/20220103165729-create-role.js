'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          name: "admin",
        },
        {
          id:2,
          name: 'operator'
        },
        {
          id:3,
          name: 'fakeRole'
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Roles", null,{})

    
  }
};
