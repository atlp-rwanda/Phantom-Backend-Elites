import Sequelize from 'sequelize';
require('dotenv').config();

var connection = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD,{
    host: process.env.HOST,
    port:5432,
    dialect : process.env.DIALECT 
});
try {
    connection.authenticate();
    console.log('connection started successfully');
} catch (error) {
    console.log('unable to connected to database',error);
}
module.exports = connection