const models = require("../models/index"); 
const fs = require("fs"); 

// Afficher tout les articles
exports.viewAllArticles = (req, res, next) => {
  models.Article.findAll({ order: [['createdAt', 'DESC']]})
    .then((articles) => {
      if (!articles || articles.length === 0) {
        res.status(404).json({ error: "Aucun article pour le moment 🧐" });
      }
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.log("catch findAll", error);
      res.status(500).json({error: "Une erreur est survenue 😕"});
    });
};

// Afficher un article
exports.ViewArticle = async (req, res) => {
  const articleFound = await models.Article.findOne({
    where: { id_article: req.params.id }, 
    include: [Utilisateur]
  });
  if (articleFound) {
    res.status(200).json({ articleFound });
  } else {
    res.status(404).json({ error: "Article introuvable 🧐" });
  }
};

// Créer un article
module.exports.createArticle = async (req, res) => {
  try {
    if (req.body.titre !== null && req.body.text !== null) {
      await models.Article.create({
        id_user: req.auth.userId,
        titre: req.body.titre,
        text: req.body.text,
        media: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : "",
      });
      return res.status(201).json("Article créé 👍");
    } else {
      return res.status(401).json({ error: "Merçi de remplir tout les champs correctement 🙏" });
    }
  } catch (err) {
    console.log("---------", err);
    return res.status(500).json({ error: "Une erreur est survenue 😕" });
  }
};

// Mise a jour d'un article
exports.updateArticle = async (req, res) => {
  let article = await models.Article.findOne({ where: { id_article: req.params.id } });
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // console.log("-------", filename);
      if (req.file) {
        fs.unlink(`images/${filename}`, () => {
          models.Article.update(
            {
              media: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
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
        });
      } else {
        // Mettre a jour texte, titre et date de l'article
        console.log("body",req.body);
        models.Article.update(
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
      return res.status(201).json("L'article est mis a jour 👍");
    } else {
      return res.status(401).json("Requête non authorisée ⛔");
    }
  } else {
    res.status(404).json("Article introuvable 🧐");
  }
};

// Mise a jour image d'un article
exports.updateImage = async (req, res) => {
  let article = await models.Article.findOne({ where: { id_article: req.params.id } });
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // Supprimer image du dossier
      fs.unlink(`images/${filename}/`, () => {
        // Mettre a jour image de l'article
        models.Article.update(
          {
            media: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            // media: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
            date_mod: new Date(),
          },
          { where: { id_article: req.params.id } }
        );
        res.status(201).json("L'article est mis a jour 👍");
      });
    } else {
      res.status(500).json("Requête non authorisée ⛔");
    }
  } else {
    res.status(404).json("Article introuvable 🧐");
  }
};

// Suprimer un article
exports.deleteArticle = async (req, res) => {
  let article = await models.Article.findOne({ where: { id_article: req.params.id } });
  // Verifie que l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // Supprimer image du dossier
      fs.unlink(`images/${filename}/`, () => {
        // Supprimer l'article de la BDD
        models.Article.destroy({
          where: {
            id_article: req.params.id,
          },
        });
        res.status(201).json("L'article a été supprimé 👍");
      });
    } else {
      res.status(401).json("Requête non authorisée ⛔");
    }
  } else {
    res.status(404).json("Article introuvable 🧐");
  }
};
