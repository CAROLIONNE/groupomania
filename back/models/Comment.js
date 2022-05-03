const db = require("../db.js");
const Sequelize = require('sequelize');

const Comment = db.define(
  "commentaires",
  {
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
<<<<<<< HEAD
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
=======
    utilisateurId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
>>>>>>> feat/sequelize
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  );
  
<<<<<<< HEAD
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
=======
>>>>>>> feat/sequelize

  module.exports = Comment;
  