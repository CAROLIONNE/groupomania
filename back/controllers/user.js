const bcrypt = require("bcrypt");
const sequelize = require("../db.js");
const Utilisateur = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("dotenv").config();


// Inscription
module.exports.signup = async (req, res) => {
  const utilisateur = await Utilisateur.findOne({
    where: { mail: req.body.mail },
  });
  if (utilisateur) {
    res.json({ error: "This email is already in use!" });
  } else {
    // Cryptage du mot de passe
    bcrypt.hash(req.body.mot_psw, 10).then((hash) => {
      // Creer nouvel utilisateur
      Utilisateur.create({
        mail: req.body.mail,
        mot_psw: hash,
        pseudonyme: req.body.pseudonyme,
        poste: req.body.poste,
        bureau: req.body.bureau,
      });
      res.status(201).json("User registered");
    });
  }
};

// Connexion
module.exports.login = async (req, res) => {
  const { mail, mot_psw } = req.body;
  const utilisateur = await Utilisateur.findOne({ where: { mail: mail } });

  if (!utilisateur) {
    res.json({ error: "User not found" });
  } else {
    // Verification mot de passe
    bcrypt.compare(mot_psw, utilisateur.mot_psw).then(async (match) => {
      if (!match) {
        res.status(404).json({ error: " Email and password do not match " });
      } else {
        res.status(200).json({
          id_user: utilisateur.id_user,
          token: jwt.sign(
            { id_user: utilisateur.id_user, role: utilisateur.role },
            process.env.SECRET,
            { expiresIn: "1h" }
          ),
        });
      }
    });
  }
};

// Trouve un utilisateur avec son id
exports.getOneUser = async (req, res, next) => {
  const userFound = await Utilisateur.findOne({
    where: { id_user: req.params.id },
  });
  if (userFound) {
    res
      .status(200)
      .json({ message: "Successfuly found the user " + userFound.pseudonyme });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// Modifier infos utilisateur
module.exports.updateUser= async (req, res) => {
  const utilisateur = await Utilisateur.update({ 
    mail: req.body.mail,
    pseudonyme: req.body.pseudonyme,
    poste: req.body.poste,
    bureau: req.body.bureau,
  },{
    where : {
      id_user: req.params.id
    }
  })
  if (utilisateur) {
    return res.status(200).json(" User update")
  } else {
    return res.status(500).json({ error: "Can't update user"})
  }
}
// Modifier MDP utilisateur
module.exports.updatePassword = async (req, res) => {
  const utilisateur = await Utilisateur.update({ 
    mot_psw: req.body.mot_psw
  },{
    where : {
      id_user: req.params.id
    }
  })
  if (utilisateur) {
    return res.status(200).json(" Password update")
  } else {
    return res.status(500).json({ error: "Can't update password"})
  }
}
// Modifier avatar d'un utilisateur
module.exports.updateAvatar = async (req, res) => {
  const avatarObject = JSON.parse(req.body.article)
  delete avatarObject.avatar;
  const utilisateur = await Utilisateur.update({ 
    avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  },{
    where : {
      id_user: req.params.id
    }
  })
  if (utilisateur) {
    return res.status(200).json(" Avatar update")
  } else {
    return res.status(500).json({ error: "Can't update avatar"})
  }
}

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
	await Utilisateur.destroy({
		where: {
			id_user: req.params.id,
		},
	})
	res.status(201).json('User deleted')
}


