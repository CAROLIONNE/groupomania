const db = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");

const Article = db.define(
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
    db, // We need to pass the connection instance
    modelName: "Article",
    tableName: "articles",
    timestamps: false,
  }
);
Article.associate = (models) => {
  Article.hasMany(models.Comment, {
    foreignKey: 'id_article', onDelete: "cascade",
  });
  Article.hasOne(models.Utilisateur, {
   foreignKey: 'id_user',onDelete: "cascade",
  });
  Article.belongsTo(models.Utilisateur, {
    foreignKey: 'id_user',onDelete: "cascade",
  });
};


module.exports = Article;