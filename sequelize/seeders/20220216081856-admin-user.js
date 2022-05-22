"use strict";
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "admin",
          lastName: "admin",
          email: "admin@admin.com",
          gender: "Male",
          password: await bcrypt.hash("admin", 12),
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "David",
          lastName: "Neza",
          email: "neza@gmail.com",
          gender: "Male",
          password: await bcrypt.hash("davidneza", 12),
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          firstName: "Isaac",
          lastName: "Ishimwe",
          email: "isaac@gmail.com",
          gender: "Male",
          password: await bcrypt.hash("isaacishimwe", 12),
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Clare",
          lastName: "Mutoni",
          email: "clare@gmail.com",
          gender: "Female",
          password: await bcrypt.hash("claremutoni", 12),
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Moreen",
          lastName: "Kwera",
          email: "kwera@gmail.com",
          gender: "Female",
          password: await bcrypt.hash("moreenkwera", 12),
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Naboth",
          lastName: "Kyaze",
          email: "kyaze@gmail.com",
          gender: "Female",
          password: await bcrypt.hash("nabothkyaze", 12),
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
