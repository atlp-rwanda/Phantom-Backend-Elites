'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Routes', [{
      id: 1,
      name: 'KIMIRONKO - DOWNTOWN',
      origin: 'KIMIRONKO',
      destination: 'DOWNTOWN',
      distance: '10km',
      busStops: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      assignedBuses: [1, 2, 3, 4, 5]
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Routes', null, {});
  }
};
