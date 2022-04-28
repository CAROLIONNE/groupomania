require("dotenv").config();


//Connexion BDD sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.database,
  process.env.user_sql,
  process.env.password_sql,
  {
    host: process.env.host_sql,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;


