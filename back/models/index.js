const Utilisateur = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

Utilisateur.hasMany(Article, { onDelete: "cascade"});
Utilisateur.hasMany(Comment, { onDelete: "cascade"});
Article.hasMany(Comment, { onDelete: "cascade"});
Article.belongsTo(Utilisateur, { onDelete: "cascade"});
Comment.belongsTo(Utilisateur, { onDelete: "cascade"});
Comment.belongsTo(Article, { onDelete: "cascade"});

module.exports = {
    Utilisateur,
    Article,
    Comment,
};