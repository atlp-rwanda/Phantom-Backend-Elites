"use strict";

module.exports= {
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        id: 1,
        firstName: "admin",
        lastName: "admin",
        email: "admin@test.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
},
 async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  // eslint-disable-next-line no-undef
  await queryInterface.bulkDelete("Users", null, bulkDeleteOptions);
}}
