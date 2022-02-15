
// const Article = require('../models/Article')
const Article = require('../models').Article
// const { article } = require('../models');
// const t = await sequelize.transaction();

// const article1 = Article.build ({ id_user: 1, titre:"un article",  text: "Article de super qualité"}), ;
// console.log(article1);
// article1.save()
// .catch(err => console.log(err))

exports.ViewArticle = (req, res) => {
  const articleFound = Article.findOne({
    where: { id_article: req.params.id_article },
  }).catch((err) => console.log(err));

  if (articleFound) {
    res
      .status(200)
      .json({ message: `articleFound : ${articleFound.id_article}` });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.viewAllArticles = (req, res, next) => {
  Article.findAll()
    .then((articles) => {
      if (!articles || articles.length === 0) {
        res.status(404).json({ error: "Can't find any articles" });
      }

      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(500).json({ error: "unable to access to the posts in DB" });
    });
};

exports.deleteArticle = async (req, res) => {
  await Article.destroy({
    where: {
      id_article: req.params.id_article,
    },
  }).catch((err) => console.log(err));
};
