const User = require('../models/User');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

User.hasMany(Article);
User.hasMany(Comment);
Article.hasMany(Comment);
Article.belongsTo(User);
Comment.belongsTo(User);
Comment.belongsTo(Article);
// User.belongsTo(Article, {
//     through: Article,
//     foreignKey: 'id_user'
// });
// User.hasMany(Comment, {
//     through: Comment,
//     foreignKey: 'id_user'
// });
// Article.hasMany(Comment, {
//     through: Comment,
//     foreignKey: 'id_article'
// });
// Article.belongsTo(User, {
//     through: User,
//     foreignKey: 'id_user'
// });
// Comment.belongsTo(User, {
//     through: User,
//     foreignKey: 'id_user'
// });
// Comment.belongsTo(Article, {
//     through: Article,
//     foreignKey: 'id_article'
// });



module.exports = {
    User,
    Article,
    Comment,
};