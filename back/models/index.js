const Utilisateur = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

Utilisateur.hasMany(Article);
Utilisateur.hasMany(Comment);
Article.hasMany(Comment);
Article.belongsTo(Utilisateur);
Comment.belongsTo(Utilisateur);
Comment.belongsTo(Article);

module.exports = {
    Utilisateur,
    Article,
    Comment,
};