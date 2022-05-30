const models = require("../models/index");

// Afficher commentaires d'un article
exports.ViewComment = async (req, res) => {
  // Requête base de donnée
  const commentFound = await models.Comment.findAll({
    where: { articleId: req.params.id },
    // Inclus le pseudonyme des utilisateurs
    include: [{ model: models.Utilisateur, attributes: ["pseudonyme"] }],
    // Trier plus récent au plus ancien
    order: [["createdAt", "DESC"]],
  });
  // Si il y a un commentaire il est renvoyé en JSON
  if (commentFound.length > 0) {
    res.status(200).json(commentFound);
  } else {
    res
      .status(404)
      .json({ error: "Pour l'instant, pas de commentaire sur cet article 🙄" });
  }
};

// Créer un commentaire
module.exports.createComment = async (req, res) => {
  try {
    // Requête base de donnée
    await models.Comment.create({
      articleId: req.params.id,
      utilisateurId: req.auth.userId,
      text: req.body.text,
    });
    res.status(201).json("Commentaire créé 😉");
  } catch (error) {
    console.log(error);
    res.status(401).json("Merçi de remplir le champ correctement 🙏");
  }
};

// Modifier texte d'un commentaire
module.exports.updateComment = async (req, res) => {
  // Requête base de donnée
  let com = await models.Comment.findOne({
    where: { id: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Commentaire introuvable 🧐" });
  }
  // Acces admin ou utilisateur qui a créer le post
  if (req.auth.userId == com.utilisateurId || req.auth.isAdmin == 1) {
    // Mise à jour du commentaire et de la date
    models.Comment.update(
      { text: req.body.text, updatedAt: new Date() },
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
  // Requête base de donnée 
  let com = await models.Comment.findOne({
    where: { id: req.params.id },
  });
  if (!com) {
    return res.status(404).json({ err: "Commentaire introuvable 🧐" });
  }
  // Acces admin ou utilisateur qui a créer le post
  if (req.auth.userId == com.utilisateurId || req.auth.isAdmin == 1) {
    // Supression en base de donnée
    await models.Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json("Commentaire supprimé 😊");
  } else {
    res.status(401).json("Requête non authorisée ⛔");
  }
};
