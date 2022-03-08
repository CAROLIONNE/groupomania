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
      res.status(500).json( error, "cannot access to DB" );
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
  }
};

// TO DO gestion des images
// Créer un article
// try {
//   console.log(req.body);
//   const articleObject = JSON.parse(req.body.media);
//   delete articleObject.id_article;
//   console.log(articleObject);
// } catch (err) {
//   console.log(err);
// }

module.exports.createArticle = async (req, res) => {
  try {
    if (req.body.titre.length >=3  && req.body.texte.length >=3) {
      Article.create({
        id_user: req.auth.userId,
        titre: req.body.titre,
        text: req.body.text,
        media: req.body.media,
        // media: "../images/photo-paysage.jpg",
        // media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      });
      return res.status(201).json("article created");
    } else {
      return res.status(401).json({ error: `can't create a new article ` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `can't create a new article ` });
  }
};

// module.exports.createArticle = async (req, res) => {
//   const articleObject = JSON.parse(req.body.article);
//   console.log(articleObject);
//   delete articleObject.id_article;
//   const article = await Article.create({
//     ...articleObject,
//     media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
//   }).catch((err) => console.log(err));

//   if (article) {
//     return res.status(201).json({ "number article create": article.id });
//   } else {
//     return res.status(500).json({ error: `can't create a new article ` });
//   }
// };

// TO DO gestion des images
  // Mise a jour d'un article
exports.updateArticle = async (req, res) => {
  let article = await Article.findOne({ where: { id_article: req.params.id } });
  console.log(article);
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Mettre a jour l'article
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
      res.status(201).json("Article updated with success");
    } else {
      res.status(500).json("Request non authorized");
    }
  } else {
    res.status(404).json("Article undefined");
  }
};

// TO DO gestion des images
// Suprimer un article
exports.deleteArticle = async (req, res) => {
  let article = await Article.findOne({ where: { id_article: req.params.id } });
  // Verifie si l'article existe
  if (article) {
    // Acces admin ou utilisateur qui a créer le post
    if (req.auth.userId == article.id_user || req.auth.role == 1) {
      // Supprimer l'article
      Article.destroy({
        where: {
          id_article: req.params.id,
        },
      });
      res.status(201).json("Article deleted with success");
    } else {
      res.status(500).json("Request non authorized");
    }
  } else {
    res.status(404).json("Article undefined");
  }
};
// exports.deleteArticle = async (req, res) => {
//   let article = await Article.findOne({where: {id_article: req.params.id} });
//   // Verifie que l'article existe
//   // if (article.id_article !== req.params.id) {
//   //   return res.status(404).json("Article undefined");
//   // }
//   // Acces admin ou utilisateur qui a créer le post
//   console.log(article);
//   if (req.auth.userId == article.id_user || req.auth.role == 1) {
//     // nom du fichier a supprimer
//     const filename = article.media.split("/images/")[1];
//     // Supprimer image du dossier
//     fs.unlink(`images/${filename}/`, () => {
//       // Supprimer l'article
//       Article.destroy({
//         where: {
//           id_article: req.params.id,
//         },
//       });
//       res.status(201).json("Article deleted with success");
//     });
//   } else {
//     res.status(500).json({ error });
//   }
// };
