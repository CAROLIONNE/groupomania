<<<<<<< HEAD
const Comment = require("../models/Comment");
// const models = require('../models/index');

// Afficher commentaires d'un article
exports.ViewComment = async (req, res) => {
  const commentFound = await Comment.findAll({
    where: { id_article: req.params.id },
  });
  if (commentFound.length >= 1) {
    res.status(200).json(commentFound);
=======
// const Comment = require("../models/Comment");
const models = require("../models/index"); 

// Afficher commentaires d'un article
exports.ViewComment = async (req, res) => {
  const commentFound = await models.Comment.findAll({
    where: { articleId: req.params.id },
  })
  if (commentFound.length > 0) {
    res.status(200).json( commentFound );
>>>>>>> feat/sequelize
  } else {
    console.log("0 commentaire trouvé");
    res
      .status(404)
      .json({ error: "Pour l'instant, pas de commentaire sur cet article 🙄" });
  }
};

// Créer un commentaire
module.exports.createComment = async (req, res) => {
<<<<<<< HEAD
  if (req.body.text !== null) {
    try {
      await Comment.create({
        id_article: req.params.id,
        id_user: req.auth.userId,
        text: req.body.text,
      });
      res.status(201).json("Commentaire créé 😉");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res
      .status(401)
      .json({ error: "Merçi de remplir tout les champs correctement 🙏" });
  }
};
=======
  try {
  await models.Comment.create({
    articleId: req.params.id,
    utilisateurId: req.auth.userId,
    text: req.body.text,
  });
  res.status(201).json("Commentaire créé 😉");
} catch (error) {
  console.log(error);
  res.status(401).json("Merçi de remplir tout les champs correctement 🙏");
}
}
>>>>>>> feat/sequelize

// Modifier texte d'un commentaire
module.exports.updateComment = async (req, res) => {
<<<<<<< HEAD
  // Verifie que l'id du commentaire existe
  let com = await Comment.findOne({
    where: { id_commentaire: req.params.id },
=======
    // Verifie que l'id du commentaire existe
  let com = await models.Comment.findOne({
    where: { id: req.params.id },
>>>>>>> feat/sequelize
  });
  if (!com) {
    return res.status(404).json({ err: "Commentaire introuvable 🧐" });
  }
  // Acces admin ou utilisateur qui a créer le post
  if (req.auth.userId == com.utilisateurId || req.auth.isAdmin == 1) {
    // Mise à jour du commentaire
<<<<<<< HEAD
    Comment.update(
      {text: req.body.text, date_mod: new Date() },
=======
    models.Comment.update(
      { text: req.body.text, updatedAt: new Date() },
>>>>>>> feat/sequelize
      {
        where: { id: req.params.id },
      }
    );
    res.status(201).json("Commentaire mis à jour 😊");
  } else {
    res.status(401).json({ error: "Requête non authorisée ⛔" });
  }
};

// Suprimer un commentaire
exports.deleteComment = async (req, res) => {
  // Verifie que l'id du commentaire existe
  let com = await models.Comment.findOne({
    where: { id: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Commentaire introuvable 🧐" });
  }
  // Acces admin ou utilisateur qui a créer le post
  if (req.auth.userId == com.utilisateurId || req.auth.isAdmin == 1) {
    // Supression
    await models.Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
<<<<<<< HEAD
    res.status(201).json("Commentaire supprimé 👍");
=======
    res.status(201).json("Commentaire supprimé 😊");
>>>>>>> feat/sequelize
  } else {
    res.status(401).json("Requête non authorisée ⛔");
  }
};
