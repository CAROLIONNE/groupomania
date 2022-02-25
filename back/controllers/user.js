const bcrypt = require("bcrypt");
const sequelize = require("../db.js");
const Utilisateur = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

require("dotenv").config();

// Inscription
module.exports.signup = async (req, res) => {
  if(!EMAIL_REGEX.test(req.body.mail)) { return res.status(400).json({ error: 'Invalid email' })}
  const utilisateur = await Utilisateur.findOne({
    attributes:['mail'],
    where: { mail: req.body.mail },
  });
  if (utilisateur) {
    return res.status(401).json({ error: "This email is already in use!" });
  } else {
    // Cryptage du mot de passe
    bcrypt.hash(req.body.mot_psw, 10)
    .then((hash) => {
      // Creer nouvel utilisateur 
      Utilisateur.create({
        mail: req.body.mail,
        role: req.body.role,
        mot_psw: hash,
        pseudonyme: req.body.pseudonyme,
        poste: req.body.poste,
        bureau: req.body.bureau,
      });
      res.status(201).json("User registered");
    })
  }
};

// Connexion
module.exports.login = async (req, res) => {
  const { mail, mot_psw } = req.body;
  const userFound = await Utilisateur.findOne({ where: { mail: mail } });

  if (!userFound) {
    res.json({ error: "User not found" });
  } else {
    // Verification mot de passe
    bcrypt.compare(mot_psw, userFound.mot_psw).then(async (verify) => {
      if (!verify) {
        res.status(404).json({ error: " Email and password do not match " });
      }
      console.log(userFound.role);
      res.status(200).json({
        userID: userFound.id_user,
        token: jwt.sign(
          { id_user: userFound.id_user, role: userFound.role}, 
          process.env.SECRET, 
          {expiresIn: "1h"}
          )
      });
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
      .json({ "user id": userFound.id_user , "pseudonyme": userFound.pseudonyme  })
  } else {
    res.status(404).json({ error: "User not found" });
  }
};


// TO DO autorisation admin
// Modifier infos utilisateur
module.exports.updateUser = async (req, res) => {
  await Utilisateur.findOne({ where: {id_user: req.params.id}}).then(
    (userFound) => {
    if (!userFound) return res.status(404).json({ error: "User not found" });
    console.log("role token",req.auth.role);
    console.log("role user",userFound.role);
    if (req.auth.role == 1 ) return res.status(201).json ( "Admin is authorised to change informations")
    if (userFound.id_user !== req.auth.userId || req.auth.role == 0) return res.status(401).json({ error: "request non authorized" });
    const utilisateur =  Utilisateur.update(
      {
        mail: req.body.mail,
        pseudonyme: req.body.pseudonyme,
        poste: req.body.poste,
        bureau: req.body.bureau,
      },
      {
        where: {
          id_user: req.params.id,
        },
      }
    );
    if (utilisateur) {
      return res.status(200).json(" User update");
    } else {
      return res.status(500).json({ error: "Can't update user" });
    }
  })
};

// Modifier MDP utilisateur
module.exports.updatePassword = async (req, res) => {
  await Utilisateur.findOne({ where: {id_user: req.params.id}}).then(
    (user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.id_user !== req.auth.userId) return res.status(401).json({ error: "request non authorized" });
    bcrypt.hash(req.body.mot_psw, 10)
    .then((hash) => {
    const utilisateur =  Utilisateur.update(
      {
        mot_psw: hash,
        date_mdp: new Date()
      },
      {
        where: {
          id_user: req.params.id,
        },
      }
    );
    if (utilisateur) {
      console.log(utilisateur); 
      return res.status(200).json(" Password update");
    } else {
      return res.status(500).json({ error: "Can't update Password" });
    }
    })
  })
  };

// TO DO verifier image
// Modifier avatar d'un utilisateur
module.exports.updateAvatar = async (req, res) => {
  await Utilisateur.findOne({ where: {id_user: req.params.id}}).then(
    (user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.id_user !== req.auth.userId) return res.status(401).json({ error: "request non authorized" });
    const avatarObject = JSON.parse(req.body.article);
    delete avatarObject.avatar;
    const utilisateur =  Utilisateur.update(
      {
        avatar: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename}`,
      },
      {
        where: {
          id_user: req.params.id,
        },
      }
    );
    if (utilisateur) {
      console.log(utilisateur); 
      return res.status(200).json(" Avatar update");
    } else {
      return res.status(500).json({ error: "Can't update Avatar" });
    }
  })
};



// Modifier avatar d'un utilisateur
// module.exports.updateAvatar = async (req, res) => {
//   const avatarObject = JSON.parse(req.body.article);
//   delete avatarObject.avatar;
//   const utilisateur = await Utilisateur.update(
//     {
//       avatar: `${req.protocol}://${req.get("host")}/images/${
//         req.file.filename}`,
//     },
//     {
//       where: {
//         id_user: req.params.id,
//       },
//     }
//   );
//   if (utilisateur) {
//     return res.status(200).json(" Avatar update");
//   } else {
//     return res.status(500).json({ error: "Can't update avatar" });
//   }
// };

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  await Utilisateur.findOne({ where: {id_user: req.params.id}}).then(
    (user) => {
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.id_user !== req.auth.userId) return res.status(401).json({ error: "request non authorized" });
    Utilisateur.destroy({
      where: {
        id_user: req.params.id,
      },
    });
    res.status(201).json("User deleted");
    })
};