const Article = require("../models/Article");
const fs = require("fs");

// Afficher tout les articles
exports.viewAllArticles = (req, res, next) => {
  Article.findAll()
    .then((articles) => {
      if (!articles || articles.length === 0) {
        res.status(404).json({ error: "Can't find any articles" });
      }
      res.status(200).json(articles);
    })
    .catch((error) => {
      res.status(500).json({ error: "cannot access to DB" });
    });
};

// Afficher un article
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

// TO DO verifier images
// Créer un article
module.exports.createArticle = async (req, res) => {
  const articleObject = JSON.parse(req.body.article);
  delete articleObject.id_article;
  const article = await Article.create({
    ...articleObject,
    media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // id_article: req.body.id_article,
    // id_user: req.body.id_user,
    // titre: req.body.titre,
    // media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // text: req.body.text,
  }).catch((err) => console.log(err));

  if (article) {
    return res.status(201).json({ "number article create": article.id });
  } else {
    return res.status(500).json({ error: `can't create a new article ` });
  }
};

// Modifier titre et/ou texte d'un article
module.exports.updateArticle = async (req, res) => {
  const article = await Article.update(
    { titre: req.body.titre, text: req.body.text },
    {
      where: {
        id_article: req.params.id,
      },
    }
  );
  if (article) {
    return res.status(201).json("article update");
  } else {
    return res.status(500).json({ error: `can't update article ` });
  }
};

// Suprimer un article
exports.deleteArticle = async (req, res) => {
  await Article.findOne({ id_article: req.params.id })
    .then((article) => {
      const filename = article.media.split("/images/")[1];
      fs.unlink(`images/${filename}/`, () => {
        Article.destroy({
          where: {
            id_article: req.params.id,
          },
        });
        res.status(201).json("Account deleted with success");
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
