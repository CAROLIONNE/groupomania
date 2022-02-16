const sequelize = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comment",
  {
    id_commentaire: {
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
    date_crea: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    date_mod: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,

    },
    titre: {
      type: DataTypes.STRING(150),
      defaultValue: "title",
      allowNull: false,
    },
    text: {
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
  
  module.exports = Comment;
  
  
  // const comment1 = Comment.build({ id_article: 1, id_user: 1, text: "Super" });
  // console.log(comment1);
  // comment1.save()
  // .catch(err => console.log(err))