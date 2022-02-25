const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');

router.get('/', articleCtrl.viewAllArticles);
router.get('/:id', articleCtrl.ViewArticle);
router.post('/', auth, multer, articleCtrl.createArticle);
router.put('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;