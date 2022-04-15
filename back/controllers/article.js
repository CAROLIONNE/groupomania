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
      res.status(500).json(error, "cannot access to DB");
    });
};

// Afficher un article
exports.ViewArticle = async (req, res) => {
  const articleFound = await Article.findOne({
    where: { id_article: req.params.id },
  });
  if (articleFound) {
    res.status(200).json({ articleFound });
  } else {
    res.status(404).json({ error: "Article not found" });
  }
};

// Créer un article
module.exports.createArticle = async (req, res) => {
  try {
    if (req.body.titre !== null && req.body.text !== null) {
      await Article.create({
        id_user: req.auth.userId,
        titre: req.body.titre,
        text: req.body.text,
        media: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : "",
      });
      return res.status(201).json("article created");
    } else {
      return res.status(401).json({ error: `can't create a new article ` });
    }
  } catch (err) {
    console.log("filefound", req.file);
    console.log("---------", err);
    return res.status(500).json({ error: `can't create a new article ` });
  }
};

// Mise a jour d'un article
exports.updateArticle = async (req, res) => {
  let article = await Article.findOne({ where: { id_article: req.params.id } });
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // console.log("-------", filename);
      if (req.file) {
        fs.unlink(`images/${filename}`, () => {
          Article.update(
            {
              media: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
              date_mod: new Date(),
            },
            {
              where: {
                id_article: req.params.id,
              },
            }
          );
        });
      } else {
        // Mettre a jour texte, titre et date de l'article
        console.log("update sans img");
        console.log(req.body);
        Article.update(
          {
            titre: req.body.titre,
            text: req.body.text,
            date_mod: new Date(),
          },
          {
            where: {
              id_article: req.params.id,
            },
          }
        );
      }
      return res.status(201).json("Article updated with success");
    } else {
      res.status(500).json("Request non authorized");
    }
  } else {
    res.status(404).json("Article undefined");
  }
};

// Mise a jour image d'un article
exports.updateImage = async (req, res) => {
  let article = await Article.findOne({ where: { id_article: req.params.id } });
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // Supprimer image du dossier
      fs.unlink(`images/${filename}/`, () => {
        // Mettre a jour image de l'article
        Article.update(
          {
            media: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            // media: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
            date_mod: new Date(),
          },
          { where: { id_article: req.params.id } }
        );
        res.status(201).json("Article updated with success");
      });
    } else {
      res.status(500).json("Request non authorized");
    }
  } else {
    res.status(404).json("Article undefined");
  }
};

// Suprimer un article
exports.deleteArticle = async (req, res) => {
  let article = await Article.findOne({ where: { id_article: req.params.id } });
  // Verifie que l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // Supprimer image du dossier
      fs.unlink(`images/${filename}/`, () => {
        // Supprimer l'article de la BDD
        Article.destroy({
          where: {
            id_article: req.params.id,
          },
        });
        res.status(201).json("Article deleted with success");
      });
    } else {
      res.status(401).json("Request non authorized");
    }
  } else {
    res.status(404).json("Article undefined");
  }
};
