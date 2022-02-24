"use strict";

export async function up(queryInterface) {
  await queryInterface.bulkInsert(
    "user",
    [
      {
        id: 1,
        firstName: "admin",
        lastName: "admin",
        email: "admin@test.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
}
export async function down(queryInterface) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  // eslint-disable-next-line no-undef
  await queryInterface.bulkDelete("user", null, bulkDeleteOptions);
}
