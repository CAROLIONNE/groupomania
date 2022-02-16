const Article = require("../models/Article");
// const Article = require('../models').Article
// const { article } = require('../models');



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

module.exports.createArticle = (req, res) => {
  const article = Article.create({
    id_article: req.body.id_article,
    id_user: req.body.id_user,
    text: req.body.text,
  }).catch((err) => console.log(err));
};

module.exports.updateArticle = (req, res) => {
  try {
    const article = Article.update({
      id_article: req.body.id_article,
      id_user: req.body.id_user,
      text: req.body.text,
    });
    console.log("ID article:", comment.id_article);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteArticle = async (req, res) => {
  await Article.destroy({
    where: {
      id_article: req.params.id_article,
    },
  }).catch((err) => console.log(err));
};
