const Comment = require("../models/Comment");


exports.ViewComment = (req, res) => {
    const commentFound = Comment.findOne({
      where: { id_commentaire: req.params.id },
    }).catch((err) => console.log(err));

    if (commentFound) {
      res
        .status(200)
        .json({ message: `comment : ${commentFound.id_commentaire}` });
    } else {
      res.status(404).json({ error: "comment not found" });
    }
  };

module.exports.createComment = (req, res) => {
  try {
    const comment = Comment.create({
      id_article: req.body.id_article,
      id_user: req.body.id_user,
      text: req.body.text,
    });
    console.log('Comment update !');
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateComment = (req, res) => {
    try {
        const comment = Comment.update({
            id_article: req.body.id_article,
            id_user: req.body.id_user,
            text: req.body.text,
          });
          console.log("ID article:", comment.id_article);
        } catch (error) {
          console.log(error);
        }
    }

exports.deleteComment = async (req, res) => {
    await Comment.destroy({
      where: {
        id_commentaire: req.params.id_commentaire,
      },
    }).catch((err) => console.log(err));
  };
