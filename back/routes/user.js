const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
// const auth = require("../middlewares/auth");

// router.get('/:id', userCtrl.getOneUser);
// router.get('/:id', userCtrl.forgetPassword);
router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);
// router.put('/:id', userCtrl.updateUser);
// router.put('/:id', userCtrl.updatePassword);
// router.put('/:id', userCtrl.updateAvatar);
// router.delete('/:id', userCtrl.deleteUser);


module.exports = router;