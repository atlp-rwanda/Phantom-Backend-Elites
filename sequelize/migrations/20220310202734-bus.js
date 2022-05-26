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
      driver:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
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
