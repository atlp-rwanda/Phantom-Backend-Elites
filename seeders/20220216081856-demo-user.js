'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          id: 1,
          firstName: 'Fabien',
          lastName: 'NIRINGIYIMANA',
          email: 'user1@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          firstName: 'isaac',
          lastName: 'ISHIMWE',
          email: 'user2@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          firstName: 'Emmanuel',
          lastName: 'ASIFIWE',
          email: 'user3@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          firstName: 'Fides',
          lastName: 'Noella',
          email: 'user4@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          firstName: 'Eric',
          lastName: 'MALABA',
          email: 'user5@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          firstName: 'Mike',
          lastName: 'ANGWANDIA',
          email: 'user6@test.com',
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
  }
};
