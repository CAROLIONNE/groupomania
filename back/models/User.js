const db = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Utilisateur = db.define(
  "utilisateur",
  {
    mail: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: "0",
      allowNull: false,
    },
    mot_psw: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    temp_psw: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(75),
      defaultValue: "default.png",
      allowNull: false,
    },
    pseudonyme: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    poste: {
      type: DataTypes.STRING(25),
    },
    bureau: {
      type: DataTypes.STRING(15),
    },
  }
);

module.exports = Utilisateur;
