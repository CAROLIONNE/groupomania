const Article = require("../models/Article");
// const Article = require('../models').Article
// const { Article } = require('../models');

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

exports.ViewArticle = async (req, res) => {
  const articleFound = await Article.findOne({
    where: { id_article: req.params.id },
  }).catch((err) => console.log(err));

  if (articleFound) {
    res
      .status(200)
      .json({ message: `articleFound : ${articleFound.id_article}` });
  } else {
    res.status(404).json({ error: "Article not found" });
    console.log(articleFound);
  }
};

module.exports.createArticle = async (req, res) => {
  const article = await Article.create({
    id_article: req.body.id_article,
    id_user: req.body.id_user,
    titre :  req.body.titre, 
    media: req.body.media,
    text: req.body.text,
  }).catch((err) => console.log(err));

  if(article){
    return res.status(201).json({ postId : article.id })
} else {
    return res.status(500).json({ error: `can't create a new article `})
}
};

module.exports.updateArticle = async (req, res) => {
    const article = await Article.update({
      id_article: req.body.id_article,
      id_user: req.body.id_user,
      titre :  req.body.titre,
      text: req.body.text,
    }, { where: { id_user : id_user }
    });
  
  if(article){
    return res.status(201).json({ "ID article update  :" + article.id_article })
} else {
    return res.status(500).json({ error: `can't update article `})
}
};



exports.deleteArticle = async (req, res) => {
  await Article.destroy({
    where: {
      id_article: req.params.id_article,
    },
  }).catch((err) => console.log(err));
};
