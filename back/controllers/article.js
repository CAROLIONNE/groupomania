const models = require("../models/index");
const fs = require("fs");

// Afficher tout les articles
exports.viewAllArticles = (req, res, next) => {
  // Requête base de donnée 
  models.Article.findAll({
    // Inclus le pseudonyme de l'utilisateur 
    include: [{ model: models.Utilisateur, attributes: ["pseudonyme"] }],
    // Trier plus récent au plus ancien
    order: [["createdAt", "DESC"]],
  })
    .then((articles) => {
      // Si il y a un article il est renvoyé en JSON
      if (!articles || articles.length === 0) {
        res.status(404).json({ error: "Aucun article pour le moment 🧐" });
      } else {
        res.status(200).json(articles);
      }
    })
    .catch((error) => {
      console.log("catch findAllArticles", error);
      res.status(500).json({ error: "Une erreur est survenue 😕" });
    });
};

// Afficher un article
exports.ViewArticle = async (req, res) => {
  // Requête base de donnée 
  const articleFound = await models.Article.findOne({
    where: { id: req.params.id },
    // Inclus le pseudonyme de l'utilisateur 
    include: [{ model: models.Utilisateur, attributes: ["pseudonyme"] }],
  });
  // Si il y a un article avec cet ID il est renvoyé en JSON
  if (articleFound) {
    res.status(200).json({ articleFound });
  } else {
    res.status(404).json({ error: "Article introuvable 🧐" });
  }
};

// Créer un article
module.exports.createArticle = async (req, res) => {
  try {
    // Contrôle champs rempli
    if (req.body.titre !== null && req.body.text !== null) {
      // Requête sequelize entrée en base de donnée
      await models.Article.create({
        utilisateurId: req.auth.userId,
        titre: req.body.titre,
        text: req.body.text,
        media: req.file? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`: "",
      });
      return res.status(201).json("Article créé 👍");
    } else {
      return res
        .status(401)
        .json({ error: "Merçi de remplir tout les champs correctement 🙏" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Une erreur est survenue 😕" });
  }
};

// Mise a jour d'un article
exports.updateArticle = async (req, res) => {
  let article = await models.Article.findOne({ where: { id: req.params.id } });
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.utilisateurId || req.auth.isAdmin == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // Si il y a un fichier mettre a jour le fichier ainsi que les autres données
      if (req.file) {
        fs.unlink(`images/${filename}`, () => {
          models.Article.update(
            {
              media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
              titre: req.body.titre,
              text: req.body.text,
              updatedAt: new Date(),
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );
        });
      } else {
        // Sinon mettre a jour texte, titre et date de l'article
        models.Article.update(
          {
            titre: req.body.titre,
            text: req.body.text,
            updatedAt: new Date(),
          },
          {
            where: {
              id: req.params.id,
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

// Suprimer un article
exports.deleteArticle = async (req, res) => {
  let article = await models.Article.findOne({ where: { id: req.params.id } });
  // Verifie que l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.utilisateurId || req.auth.isAdmin == 1) {
      // Nom du fichier a supprimer
      const filename = article.media.split("/images/")[1];
      // Supprimer image du dossier
      fs.unlink(`images/${filename}/`, () => {
        // Supprimer l'article de la BDD
        models.Article.destroy({
          where: {
            id: req.params.id,
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
