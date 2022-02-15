const sequelize = require("../db.js");
// const { Sequelize, Model, DataTypes } = require("sequelize");



module.exports = (sequelize, DataTypes) => {
const Article = sequelize.define(
  "Article",
  {
    id_article: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    media: {
      type: DataTypes.STRING(150),
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Article",
    tableName: "article",
    timestamps: false,
  } 
  );
  return Article;
}


// const article1 = Article.build ({ id_user: 1, titre:"un article",  text: "Article de super qualité"});
// console.log(article1);
// article1.save()
// .catch(err => console.log(err))
