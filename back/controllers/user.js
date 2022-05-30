const bcrypt = require("bcrypt");
const models = require("../models/index"); 
const jwt = require("jsonwebtoken");
const fs = require("fs");
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

require("dotenv").config();

// Inscription
module.exports.signup = async (req, res) => {
  // Verifie que les champs sont remplis
  if (
    req.body.mail.length < 1 ||
    req.body.mot_psw.length < 1 ||
    req.body.pseudonyme.length < 1
  ) {
    return res.status(400).json({ error: "Merçi de remplir tout les champs correctement 🙏" });
  }
  // Verifie la taille du pseudo
  if (req.body.pseudonyme.length <= 3 || req.body.pseudonyme.length >= 14) {
    return res.status(400).json({ error: "Pseudonyme trop long ou trop court (entre 3 et 14 caractères)❌" });
  }
  // Contrôle adresse email avec Regex
  if (!EMAIL_REGEX.test(req.body.mail)) {
    return res.status(400).json({ error: "Email invalide ❌" });
  }
  // Verifie que le champ est rempli
  if (req.body.pseudonyme.length == 0) {
    return res.status(401).json({ error: "Pseudonyme requis ❌" });
  }
  // Requête base de donnée
  const utilisateur = await models.Utilisateur.findOne({
    attributes: ["mail"],
    where: { mail: req.body.mail },
  });
  // Si l'utilisateur a déja un compte avec cet email renvoi l'erreur
  if (utilisateur) {
    return res.status(401).json({ error: "Cet email est deja utilisé ❌" });
  } else {
    // Cryptage du mot de passe
    bcrypt.hash(req.body.mot_psw, 10)
      .then((hash) => {
      // Creer nouvel utilisateur
      models.Utilisateur.create({
        mail: req.body.mail,
        mot_psw: hash,
        pseudonyme: req.body.pseudonyme,
      })
      .then(user => {
        delete user.mot_psw;
      return res.status(201).json({
        // Creation du token et envoi coté client
        userConnect : user,
        isAdmin: user.isAdmin,
        userID: user.id,
        token: jwt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          process.env.SECRET,
          { expiresIn: "1h" }
          ),
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err })
    })
    });
  }
};

// Connexion
module.exports.login = async (req, res) => {
  const { mail, mot_psw } = req.body;
  // Requête base de donnée
  const userFound = await models.Utilisateur.findOne({ where: { mail: mail } });
  // Verifie que l'utilisateur existe avec l'adresse email
  if (!userFound) {
    res.status(404).json({ error: "Utilisateur introuvable 🧐" });
  } else {
    // Verification mot de passe
    bcrypt.compare(mot_psw, userFound.mot_psw).then(async (verify) => {
      if (!verify) {
        res.status(404).json({ error: "L'email ou le pseudonyme est incorrect ❌" });
      }
      delete userFound.mot_psw;
      res.status(200).json({
        // Creation du token et envoi coté client
        userConnect : userFound,
        isAdmin: userFound.isAdmin,
        userID: userFound.id,
        token: jwt.sign(
          { id: userFound.id, isAdmin: userFound.isAdmin },
          process.env.SECRET,
          { expiresIn: "1h" }
        ),
      });
    });
  }
};

// Trouve un utilisateur avec son id
exports.getOneUser = async (req, res, next) => {
  const userFound = await models.Utilisateur.findOne({
    where: { id: req.params.id },
  });
  if (userFound) {
    res.status(200).json({
      user_id: userFound.id,
      mail: userFound.mail,
      poste: userFound.poste,
      bureau: userFound.bureau,
      pseudonyme: userFound.pseudonyme,
      date_crea: userFound.date_crea,
      avatar: process.env.img + userFound.avatar,
    });
  } else {
    res.status(404).json({ error: "Utilisateur introuvable 🧐" });
  }
};

// Modifier infos utilisateur
module.exports.updateUser = async (req, res) => {
  await models.Utilisateur.findOne({ where: { id: req.params.id } }).then(
    (userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "Utilisateur introuvable 🧐" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id == req.auth.userId || req.auth.isAdmin == 1) {
        // Mettre a jour les infos utilisateurs dans la base de donnée
        models.Utilisateur.update(
          {
            mail: req.body.mail,
            pseudonyme: req.body.pseudonyme,
            poste: req.body.poste,
            bureau: req.body.bureau,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        return res.status(200).json(" Vos infos ont bien été prise en compte 😉");
      } else {
        return res.status(500).json({ error: "Requête non authorisée ⛔" });
      }
    }
  );
};

// Modifier avatar d'un utilisateur
module.exports.updateAvatar = async (req, res) => {
  await models.Utilisateur.findOne({ where: { id: req.params.id } })
    .then((userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "Utilisateur introuvable 🧐" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id == req.auth.userId || req.auth.isAdmin == 1) {
        if (!req.file.filename) {
          console.log(req.file);
          console.log("filename undefined");
          return res.status(500).json({ error: "Requête non authorisée ⛔" });
        }
        else if (userFound.avatar == "default.png") {
          // Mettre à jour l'avatar en conservant img par default dans stockage serveur
          models.Utilisateur.update(
            {
              avatar: req.file.filename,
            },
            { where: { id: req.params.id } }
          );
          return res.status(200).json("Avatar mis à jour 😊");
        } else {
          // Supprimer image du dossier
          fs.unlink(`images/${userFound.avatar}/`, () => {
            // Mettre à jour l'avatar
            models.Utilisateur.update(
              {
                avatar: req.file.filename,
              },
              { where: { id: req.params.id } }
            );
            return res.status(200).json("Avatar mis à jour 😊");
          });
        }
      } else {
        return res.status(500).json({ error: "Requête non authorisée ⛔" });
      }
    }).catch((err) => {
      console.log(err);
    });
};

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  await models.Utilisateur.findOne({ where: { id: req.params.id } })
  .then(
    (userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "Utilisateur introuvable 🧐" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id == req.auth.userId || req.auth.isAdmin == 1) {
        // Nom du fichier a supprimer
        if (userFound.avatar !== "default.png") {
          // const filename = userFound.avatar.split("/images/")[1];
          const filename = userFound.avatar
          // Supprimer avatar du dossier
          fs.unlink(`images/${filename}/`, () => {
            // Supprimer l'utilisateur de la BDD
            models.Utilisateur.destroy({
              where: {
                id: req.params.id,
              },
            });
            res.status(201).json("Votre compte est supprimé 👋");
          });
        } else {
          models.Utilisateur.destroy({
            where: {
              id: req.params.id,
            },
          });
          res.status(201).json("Votre compte est supprimé 👋");
        }
      } else {
        return res.status(401).json({ error: "Requête non authorisée ⛔" });
      }
    }
  ).catch((err) => {
    console.log(err);
  });
};
