const Utilisateur = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

<<<<<<< HEAD
Utilisateur.hasMany(Article);
Utilisateur.hasMany(Comment);
Article.hasMany(Comment);
Article.belongsTo(Utilisateur);
Comment.belongsTo(Utilisateur);
Comment.belongsTo(Article);
=======
Utilisateur.hasMany(Article, { onDelete: "cascade"});
Utilisateur.hasMany(Comment, { onDelete: "cascade"});
Article.hasMany(Comment, { onDelete: "cascade"});
Article.belongsTo(Utilisateur, { onDelete: "cascade"});
Comment.belongsTo(Utilisateur, { onDelete: "cascade"});
Comment.belongsTo(Article, { onDelete: "cascade"});
>>>>>>> feat/sequelize

module.exports = {
    Utilisateur,
    Article,
    Comment,
};