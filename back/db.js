require("dotenv").config();

// Import sequelize
const { Sequelize } = require("sequelize");

// Definition des paramètres de la BDD
const sequelize = new Sequelize(
  // Variable d'environnement
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
  console.log("Connexion BDD réeussie");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;


