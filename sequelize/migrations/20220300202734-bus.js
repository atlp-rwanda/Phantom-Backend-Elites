'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Buses', { 
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plateNo:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      driverId:{
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'driverId'
        }
      },
      seats:{
        type: Sequelize.STRING,
        allowNull: false
      },
      status:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      });
  },

  async down (queryInterface, Sequelize) {    
     await queryInterface.dropTable('Buses');
  }
};
