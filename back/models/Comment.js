const sequelize = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comment",
  {
    id_article2: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    id_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dat_crea: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    dat_mod: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,

    },
    titre: {
      type: DataTypes.STRING(150),
      defaultValue: "title",
      allowNull: false,
    },
    texte: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Comment", // We need to choose the model name
    tableName: "commentaire",
    timestamps: false,
  }
);

console.log(Comment === sequelize.models.Comment);

const comment1 = Comment.build({ id_article: 1, id_user: 1, texte: "Super" });
console.log(comment1);
// comment1.save();
