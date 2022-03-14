const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.get('/:id', commentCtrl.ViewComment);
router.get('/', auth, commentCtrl.ViewAllComment);
router.post('/:idarticle', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;
