const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// const auth = require("../middlewares/auth");


router.get('/:id', userCtrl.getOneUser);


const Utilisateur = require('../models/User')

router.post('/signup', (req, res) => {
    try{
        const user = Utilisateur.create({       
            mail: req.body.mail,
            mot_psw: req.body.mot_psw,
            pseudonyme: req.body.pseudonyme, })
            ;
            console.log("user's pseudo:", user.pseudonyme);
        } catch(error){
            console.log(error);
        }
    });
    // router.get('/:id', userCtrl.forgetPassword);
    // router.post('/login', userCtrl.login);
// router.put('/:id', userCtrl.updateUser);
// router.put('/:id', userCtrl.updatePassword);
// router.put('/:id', userCtrl.updateAvatar);
// router.delete('/:id', userCtrl.deleteUser);


module.exports = router;