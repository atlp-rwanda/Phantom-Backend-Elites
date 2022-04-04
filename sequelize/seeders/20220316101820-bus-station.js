'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Busstations', [
      {
        busStationName: "Nyamirambo stadium",
        coordinates: "-1.97765015168153, 30.043772241508982",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: 'Kimironko Taxi Park',
        coordinates: '-1.9492878887819718, 30.12555476738672',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: 'Kacyiru Tax Park',
        coordinates: '-1.9338153057022478, 30.08125132714478',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: 'Nyabugogo taxi Park',
        coordinates: '-1.940383376865865, 30.044579996208245',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: 'Downtown taxi Park',
        coordinates: '-1.9431637452641068, 30.057279438536252',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: 'KBC Bus Station, Kimihurura',
        coordinates: '-1.9520925429239238, 30.091449309700156',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: 'Peyage Bus Station',
        coordinates: '-1.9459768675713864, 30.067219753411035',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: "Kabuga taxi park",
        coordinates: "-1.9790587698087654, 30.22315178013423",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        busStationName: "Remera taxi park",
        coordinates: "-1.9584973715427072, 30.118855280122258",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
