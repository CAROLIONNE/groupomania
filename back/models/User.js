const db = require("../db.js");
const Sequelize = require('sequelize');

const Utilisateur = db.define(
  "utilisateurs",
  {
    mail: {
      type: Sequelize.STRING(75),
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    mot_psw: {
      type: Sequelize.STRING(70),
      allowNull: false,
    },
    temp_psw: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING(75),
      defaultValue: "default.png",
      allowNull: false,
    },
    pseudonyme: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    poste: {
      type: Sequelize.STRING(25),
    },
    bureau: {
      type: Sequelize.STRING(15),
    },
  }
);

module.exports = Utilisateur;
