const bcrypt = require("bcrypt");
const models = require("../models/index"); 
// const Utilisateur = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

require("dotenv").config();

// Inscription
module.exports.signup = async (req, res) => {
  // Verifie que les champs sont remplis
  if (
    req.body.mail == null ||
    req.body.mot_psw == null ||
    req.body.pseudonyme == null
  ) {
    return res.status(400).json({ error: "Merçi de remplir tout les champs correctement 🙏" });
  }
  // Verifie la taille du pseudo
  if (req.body.pseudonyme.length <= 3 || req.body.pseudonyme.length >= 14) {
    return res.status(400).json({ error: "Pseudonyme trop long ou trop court ❌" });
  }
  // Contrôle adresse email
  if (!EMAIL_REGEX.test(req.body.mail)) {
    return res.status(400).json({ error: "Email invalide ❌" });
  }
  if (req.body.pseudonyme.length == 0) {
    return res.status(401).json({ error: "Pseudonyme requis ❌" });
  }
  const utilisateur = await models.Utilisateur.findOne({
    attributes: ["mail"],
    where: { mail: req.body.mail },
  });
  // si l'utilisateur a un compte avec cet email
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
      return res.status(201).json({
        // Creation du token et envoi coté client
        pseudo: user.pseudonyme,
<<<<<<< HEAD
        userID: user.id_user,
        role: user.role,
=======
        userID: user.id,
>>>>>>> feat/sequelize
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
      res.status(200).json({
        // Creation du token et envoi coté client
        role: userFound.role,
        pseudo: userFound.pseudonyme,
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
      // avatar:  userFound.avatar,
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

// Modifier MDP utilisateur
// module.exports.updatePassword = async (req, res) => {
//   await Utilisateur.findOne({ where: { id_user: req.params.id } }).then(
//     (userFound) => {
//       // Verifie que l'utilisateur existe
//       if (!userFound) return res.status(404).json({ error: "User not found" });
//       // Acces autorisé admin ou utilisateur qui a créer le compte
//       if (userFound.id_user == req.auth.userId || req.auth.role == 1) {
//         // Hachage du nouveau mot de passe
//         bcrypt.hash(req.body.mot_psw, 10).then((hash) => {
//           // Mettre a jour le mot de passe dans la base de donnée
//           Utilisateur.update(
//             {
//               mot_psw: hash,
//               date_mdp: new Date(),
//             },
//             {
//               where: { id_user: req.params.id },
//             }
//           );
//           return res.status(200).json(" Password update");
//         });
//       } else {
//         return res.status(500).json({ error: "Can't update Password" });
//       }
//     }
//   );
// };

// Modifier avatar d'un utilisateur
module.exports.updateAvatar = async (req, res) => {
  await models.Utilisateur.findOne({ where: { id: req.params.id } })
    .then((userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "Utilisateur introuvable 🧐" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id == req.auth.userId || req.auth.isAdmin == 1) {
        if (userFound.avatar == "default.png") {
          // Mettre à jour l'avatar en conservant img par default dans stockage serveur
          models.Utilisateur.update(
            {
              // avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
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
                // avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
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
    })
    .catch((err) => {
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
  ).catch(function(e) {
    console.error(e);
  })
<<<<<<< HEAD
};
module.exports.authentificate = (req, res, next) => {
  res.status(200).json({ message: "token valide !" })
=======
>>>>>>> feat/sequelize
};

module.exports.authentificate = (req, res, next) => {
  console.log("verification token")
  res.status(200).json({ message: "token valide !" })
};