'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Routes', [{
      name: "Kimironko - Downtown",
      originId: 1,
      destinationId: 2,
      busstations: [1, 2]
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Routes', null, {});
  }
};
