const db = require("../db.js");
const Sequelize = require('sequelize');

const Comment = db.define(
  "commentaires",
  {
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    utilisateurId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  );
  

  module.exports = Comment;
  