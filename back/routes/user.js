const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');
const password = require("../middlewares/password");

router.get('/me', userCtrl.getIdAndRole);
router.get("/:id", auth, userCtrl.getOneUser);
router.post("/signup", password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.updateUser); 
router.put('/avatar/:id', auth, multer, userCtrl.updateAvatar);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
