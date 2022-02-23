const Sequelize = require('sequelize')
  
// Import sequelize object, 
// Database connection pool managed by Sequelize.
const sequelize = require('../utils/database')
  
// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', {
    user_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: { 
      type: Sequelize.STRING,
      allowNull:false 
    },
    email: { 
      type: Sequelize.STRING,
      allowNull:false 
    },
    password: { 
      type: Sequelize.STRING,
      allowNull:false
    },
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
})
  
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = User