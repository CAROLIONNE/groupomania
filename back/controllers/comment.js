const Comment = require("../models/Comment");
const sequelize = require("../db.js");

// // Afficher commentaires d'un article
exports.ViewComment = async (req, res) => {
  const commentFound = await Comment.findAll({
    where: { id_article: req.params.id },
  })
  if (commentFound.length >= 1) {
    console.log("if", commentFound.length)
    res.status(200).json( commentFound );
  } else {
    console.log("else", commentFound)
    res.status(404).json({error : "No comment for this article for the moment" });
  }
};

// Afficher tous les commentaires
exports.ViewAllComment = (req, res) => {
  Comment.findAll()
    .then((commentaires) => {
      if (!commentaires || commentaires.length === 0) {
        res.status(404).json({ error: "Can't find any commentaires" });
      }
      res.status(200).json(commentaires);
    })
    .catch((error) => {
      res.status(500).json( error );
    });
};

// Créer un commentaire
module.exports.createComment = async (req, res) => {
  try {
  await Comment.create({
    id_article: req.params.idarticle,
    id_user: req.auth.userId,
    titre: req.body.titre,
    text: req.body.text,
  });
  res.status(201).json("Comment created");
} catch (error) {
  console.log(error);
  res.status(401).json("Comment not created");
}
}

// Modifier titre et/ou texte d'un commentaire
module.exports.updateComment = async (req, res) => {
    // Verifie que l'id du commentaire existe
  let com = await Comment.findOne({
    where: { id_commentaire: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Comment undefined" });
  }
  // Acces admin ou utilisateur qui a créer le post
  if (req.auth.userId == com.id_user || req.auth.role == 1) {
    // Mise à jour du commentaire
    Comment.update(
      { titre: req.body.titre, text: req.body.text, date_mod: new Date() },
      {
        where: { id_commentaire: req.params.id },
      }
    );
    res.status(201).json("comment update");
  } else {
    res.status(401).json({ error: "Request non authorized" });
  }
};

// Suprimer un commentaire
exports.deleteComment = async (req, res) => {
  // Verifie que l'id du commentaire existe
  let com = await Comment.findOne({
    where: { id_commentaire: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Comment undefined" });
  }
  // Acces admin ou utilisateur qui a créer le post
  if (req.auth.userId == com.id_user || req.auth.role == 1) {
    // Supression
    await Comment.destroy({
      where: {
        id_commentaire: req.params.id,
      },
    });
    res.status(201).json("Comment deleted with success");
  } else {
    res.status(401).json({ error: "Request non authorized" });
  }
};
