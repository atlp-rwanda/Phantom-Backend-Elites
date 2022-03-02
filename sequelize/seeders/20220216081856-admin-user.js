"use strict";
const bcrypt = require('bcrypt')

module.exports= {  
  async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        id: 1,
        firstName: "admin",
        lastName: "admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("admin",12),
        roleId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: "reset",
        lastName: "password",
        email: "reset@password.com",
        gender: "unknown",
        password: await bcrypt.hash("reset@password",12),
        roleId:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 3,
        firstName: "delete",
        lastName: "user",
        email: "delete@user.com",
        gender: "unknown",
        password: await bcrypt.hash("reset@password",12),
        roleId:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
},
 async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
}}