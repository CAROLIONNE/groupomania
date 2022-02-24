const Comment = require("../models/Comment");

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
    const comment = await Comment.create({
      id_article: req.body.id_article,
      id_user: req.auth.userId,
      titre: req.body.titre,
      text: req.body.text,
    });
    res.status(201).json("Comment created");
  } catch (error) {
    console.log(error);
  }
};

// requete ok mais ne modifie pas la BDD
// Modifier titre et/ou texte d'un commentaire
module.exports.updateComment = async (req, res) => {
  const comment = await Comment.update(
    { titre: req.body.titre, text: req.body.text, date_mod: new Date() },
    {
      where: {
        id_commentaire: req.params.id,
      },
    }
  );
  if (comment) {
    return res.status(201).json("comment update");
  } else {
    return res.status(500).json({ error: `can't update comment ` });
  }
};

// Suprimer un commentaire
exports.deleteComment = async (req, res) => {
  await Comment.destroy({
    where: {
      id_commentaire: req.params.id,
    },
  });
  res.status(201).json("Comment deleted with success");
};
