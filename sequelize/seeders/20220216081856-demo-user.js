'use strict';

module.exports= async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'user',
    [
      {
        id: 1,
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@test.com',
        password: 'admin12',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ],
    {}
  );


}
module.exports= async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('user', null, bulkDeleteOptions);
}
