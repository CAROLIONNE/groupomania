const db = require("../db.js");
const Sequelize = require('sequelize');

const Article = db.define(
  "articles",
  {
    utilisateurId: {
      type: Sequelize.INTEGER,
    },
    titre: {
      type: Sequelize.STRING(150),
      defaultValue: "title",
      allowNull: false,
    },
    media: {
      type: Sequelize.STRING(150),
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }
);
<<<<<<< HEAD
Article.associate = (models) => {
  Article.hasMany(models.Comment, {
    foreignKey: 'id_article', onDelete: "cascade",
  });
  Article.belongsTo(models.Utilisateur, {
   foreignKey: 'id_user',onDelete: "cascade",
  });
  Article.belongsTo(models.Utilisateur, {
    foreignKey: 'id_user',onDelete: "cascade",
  });
};
=======
>>>>>>> feat/sequelize


module.exports = Article;