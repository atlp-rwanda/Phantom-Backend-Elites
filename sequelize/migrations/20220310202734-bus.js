'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
        allowNull: false,
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
      }
      });
  },

  async down (queryInterface, Sequelize) {    
     await queryInterface.dropTable('Buses');
  }
};
