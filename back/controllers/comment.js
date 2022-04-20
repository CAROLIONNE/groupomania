const Comment = require("../models/Comment");

// Afficher commentaires d'un article
exports.ViewComment = async (req, res) => {
  const commentFound = await Comment.findAll({
    where: { id_article: req.params.id },
  })
  if (commentFound.length >= 1) {
    res.status(200).json( commentFound );
  } else {
    console.log("0 commentaire trouvé")
    res.status(404).json({error : "Pour l'instant, pas de commentaire sur cet article 🙄" });
  }
};

// Créer un commentaire
module.exports.createComment = async (req, res) => {
  try {
  await Comment.create({
    id_article: req.params.id,
    id_user: req.auth.userId,
    titre: req.body.titre,
    text: req.body.text,
  });
  res.status(201).json("Commentaire créé 😉");
} catch (error) {
  console.log(error);
  res.status(401).json("Merçi de remplir tout les champs correctement 🙏");
}
}

// Modifier titre et/ou texte d'un commentaire
module.exports.updateComment = async (req, res) => {
    // Verifie que l'id du commentaire existe
  let com = await Comment.findOne({
    where: { id_commentaire: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Commentaire introuvable 🧐" });
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
    res.status(201).json("Commentaire mis à jour 😊");
  } else {
    res.status(401).json({ error: "Requête non authorisée ⛔" });
  }
};

// Suprimer un commentaire
exports.deleteComment = async (req, res) => {
  // Verifie que l'id du commentaire existe
  let com = await Comment.findOne({
    where: { id_commentaire: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Commentaire introuvable 🧐" });
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
    res.status(401).json("Requête non authorisée ⛔");
  }
};
