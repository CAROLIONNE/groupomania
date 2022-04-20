const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

User.hasMany(Article);
User.hasMany(Comment);
Article.hasMany(Comment);
Article.belongsTo(User);
Comment.belongsTo(User);
Comment.belongsTo(Article);


module.exports = {
    User,
    Article,
    Comment,
};