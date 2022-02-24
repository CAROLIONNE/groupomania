const sequelize = require("../db.js");
const { Sequelize, Model, DataTypes } = require("sequelize");

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
Article.associate = (models) => {
  Article.hasMany(models.Comment, {
    onDelete: "cascade",
  });
  Article.hasOne(models.Utilisateur, {
    onDelete: "cascade",
  });
  Article.id_user = Article.belongsTo(models.Utilisateur, {
    foreignKey: "id_user",
  });
};


module.exports = Article;