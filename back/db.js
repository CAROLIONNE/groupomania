require('dotenv').config();

// Connexion BDD sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.database, process.env.user_sql, process.env.password_sql, {
    host: process.env.host_sql,
    dialect: 'mysql' 
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  module.exports = sequelize;


// // Connexion mysql
// const mysql = require('mysql');
// console.log('Get connection ...');

// const conn = mysql.createConnection({
//   database: process.env.database,
//   host: process.env.host_sql,
//   user: process.env.user_sql,
//   password: process.env.password_sql
// });

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connecté à la base de donnée");
// });

// module.exports = conn;