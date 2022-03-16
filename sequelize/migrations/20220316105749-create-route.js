'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      originId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Busstations',
          key: 'id'
        }
      },
      destinationId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Busstations',
          key: 'id'
        }
      },
      busstations: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
  }
};