module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
        unique: false,
      },
      assignedId: {
        references: {
          model: "Roles",
          key: "id"
        },
        allowNull: false,
        type: Sequelize.INTEGER,

      },
      roleName: Sequelize.STRING
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permissions');
  }
};
