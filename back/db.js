require("dotenv").config();

// Connexion BDD sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.database,
  process.env.user_sql,
  process.env.password_sql,
  {
    host: process.env.host_sql,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
 const Utilisateur = require('./models/User');
 const Comment = require('./models/Comment');
 const Article =require('./models/Article');

// relations

//  Article.hasOne(Utilisateur,{
//   foreignKey: 'id_user'
// });
// Utilisateur.belongsTo(Article);
// //--- Lien commentaire avec Article
// Comment.hasOne(Utilisateur,{
//   foreignKey: 'id_user'
// });
// Utilisateur.belongsTo(Comment);
// //--- Lien commentaire avec article
// Comment.hasOne(Article,{
//   foreignKey: 'id_article'
// });
// Article.belongsTo(Comment);
