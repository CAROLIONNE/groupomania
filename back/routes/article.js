const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
// const auth = require("../middlewares/auth");

router.get('/', articleCtrl.viewAllArticles);
router.get('/:id', articleCtrl.ViewArticle);
router.post('/', articleCtrl.createArticle);
router.put('/:id', articleCtrl.updateArticle);
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;