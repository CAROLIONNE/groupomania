const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const auth = require("../middlewares/auth");
const multer = require('multer');

router.get('/', articleCtrl.viewAllArticles);
router.get('/:id', articleCtrl.ViewArticle);
router.post('/', auth, articleCtrl.createArticle);
router.put('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;