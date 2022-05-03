const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');
const password = require("../middlewares/password");


router.post("/signup", password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/:id", auth, userCtrl.getOneUser);
<<<<<<< HEAD
router.put('/:id', auth, userCtrl.updateUser);
router.get('/auth', auth, userCtrl.authentificate);
// router.get('/:id', auth, userCtrl.forgetPassword);
// router.put('/password/:id', auth, userCtrl.updatePassword);
=======
router.get('/auth', auth, userCtrl.authentificate);
// router.get('/:id', auth, userCtrl.forgetPassword);
router.put('/:id', auth, userCtrl.updateUser); 
>>>>>>> feat/sequelize
router.put('/avatar/:id', auth, multer, userCtrl.updateAvatar);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
