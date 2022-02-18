'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 2,
          firstName: 'admin',
          lastName: 'admin_last',
          email: 'admin2@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          id: 3,
          firstName: 'admin',
          lastName: 'admin_last',
          email: 'admin3@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
       
      ],
      {}
    );


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user', null, bulkDeleteOptions);
  }
};
