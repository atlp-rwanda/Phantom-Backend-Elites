'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          firstName: 'admin',
          lastName: 'admin_last',
          email: 'admin@test.com',
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
