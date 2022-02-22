const sequelize = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");


const bcrypt = require("bcrypt");


class Utilisateur extends Model {

}

Utilisateur.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
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
    date_crea: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    date_mdp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(75),
      defaultValue: "default.jpg",
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
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Utilisateur", // We need to choose the model name
    tableName: "utilisateur",
    timestamps: false,
  })
;

module.exports = Utilisateur;
