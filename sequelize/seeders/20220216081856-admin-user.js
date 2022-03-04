"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          firstName: "moise",
          lastName: "NIYONKURU",
          email: "moise@gmail.com",
          password: "moise",
          dateofbirth: new Date(),
          gender: "Female",
          address: "Rwamagana",
          role: "User",
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
  }
};
