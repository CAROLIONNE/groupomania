const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");


const Comment = require('../models/Comment');

router.use(function (req, res, next) {
  const comment = Comment.build({ id_article: 1, id_user: 1, text: "Super" });
  console.log(comment);
  comment1.save().catch((err) => console.log(err));
});
// router.get('/:id', commentCtrl.ViewComment);
// router.post('/', commentCtrl.createComment);
// router.put('/:id', commentCtrl.updateComment);
// router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;
