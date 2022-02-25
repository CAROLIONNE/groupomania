const Comment = require("../models/Comment");
const Article = require("../models/Article");

// Afficher un commentaire
exports.ViewComment = (req, res) => {
  const commentFound = Comment.findOne({
    where: { id_commentaire: req.params.id },
  }).catch((err) => console.log(err));

  if (commentFound) {
    res.status(200).json({ message: "comment :" + commentFound.text });
  } else {
    res.status(404).json({ error: "comment not found" });
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
      res.status(500).json({ error: "cannot access to DB" });
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
