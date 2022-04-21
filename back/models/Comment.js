const db = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Comment = db.define(
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
    db, // We need to pass the connection instance
    modelName: "Comment", // We need to choose the model name
    tableName: "commentaires",
    timestamps: false,
  }
  );
  
  Comment.associate = (models) => {
    // Comment.hasOne(models.Article, {
    //   onDelete: "cascade",
    // });
    Comment.belongsTo(models.Article, {
      onDelete: "cascade", foreignKey: "id_article",
    })
    // Comment.hasOne(models.Utilisateur, {
    //   onDelete: "cascade",
    // });
    Comment.belongsTo(models.Utilisateur, {
      foreignKey: "id_user",
    });
  }

  module.exports = Comment;
  