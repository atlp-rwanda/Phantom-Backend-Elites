'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Buses', [
       {
        brand: "KBS",
        plateNo: "RAE234Z",
        driverId: null,
        seats: 80,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: "Royal",
        plateNo: "RAD344Z",
        driverId: null,
        seats: 50,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: "Express",
        plateNo: "RAC238B",
        driverId: null,
        seats: 30,
        status: "inactive",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

  ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Buses', null, {});
  }
};
