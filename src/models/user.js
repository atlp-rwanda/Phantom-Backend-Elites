import Sequelize from 'sequelize'
import db from '../config/db'
const sequelize = db
const User = sequelize.define('user',{
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
      allowNull:false,
      primaryKey:true
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
export {User as default}