const bcrypt = require("bcrypt");
const Utilisateur = require("../models/User");
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
    return res.status(400).json({ error: "Missing parameters" });
  }
  // Verifie la taille du pseudo
  if (req.body.pseudonyme.length <= 3 || req.body.pseudonyme.length >= 14) {
    return res.status(400).json({ error: "pseudonyme too long or too short" });
  }
  // Contrôle adresse email
  if (!EMAIL_REGEX.test(req.body.mail)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (req.body.pseudonyme.length == 0) {
    return res.status(401).json({ error: "Pseudonyme required" });
  }
  const utilisateur = await Utilisateur.findOne({
    attributes: ["mail"],
    where: { mail: req.body.mail },
  });
  // si l'utilisateur a un compte avec cet email
  if (utilisateur) {
    return res.status(401).json({ error: "This email is already in use !" });
  } else {
    // Cryptage du mot de passe
    bcrypt.hash(req.body.mot_psw, 10)
    .then((hash) => {
      // Creer nouvel utilisateur
      Utilisateur.create({
        mail: req.body.mail,
        mot_psw: hash,
        pseudonyme: req.body.pseudonyme,
      })
      .then(user => {
      return res.status(201).json({
        // Creation du token et envoi coté client
        pseudo: user.pseudonyme,
        userID: user.id_user,
        token: jwt.sign(
          { id_user: user.id_user, role: user.role },
          process.env.SECRET,
          { expiresIn: "1h" }
          ),
        });
      })
      .catch(err => {
        return res.status(500).json({ error: err })
    })
    });
  }
};

// Connexion
module.exports.login = async (req, res) => {
  const { mail, mot_psw } = req.body;
  const userFound = await Utilisateur.findOne({ where: { mail: mail } });
  // Verifie que l'utilisateur existe avec l'adresse email
  if (!userFound) {
    res.status(404).json({ error: "User not found" });
  } else {
    // Verification mot de passe
    bcrypt.compare(mot_psw, userFound.mot_psw).then(async (verify) => {
      if (!verify) {
        res.status(404).json({ error: " Email and password do not match " });
      }
      res.status(200).json({
        // Creation du token et envoi coté client
        pseudo: userFound.pseudonyme,
        userID: userFound.id_user,
        token: jwt.sign(
          { id_user: userFound.id_user, role: userFound.role },
          process.env.SECRET,
          { expiresIn: "1h" }
        ),
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
    console.log(userFound);
    res.status(200).json({
      user_id: userFound.id_user,
      mail: userFound.mail,
      poste: userFound.poste,
      bureau: userFound.bureau,
      pseudonyme: userFound.pseudonyme,
      date_crea: userFound.date_crea,
      avatar: process.env.img + userFound.avatar,
      // avatar:  userFound.avatar,
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// Modifier infos utilisateur
module.exports.updateUser = async (req, res) => {
  await Utilisateur.findOne({ where: { id_user: req.params.id } }).then(
    (userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "User not found" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id_user == req.auth.userId || req.auth.role == 1) {
        // Mettre a jour les infos utilisateurs dans la base de donnée
        Utilisateur.update(
          {
            mail: req.body.mail,
            pseudonyme: req.body.pseudonyme,
            poste: req.body.poste,
            bureau: req.body.bureau,
            // media:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          },
          {
            where: {
              id_user: req.params.id,
            },
          }
        );
        return res.status(200).json(" User update");
      } else {
        return res.status(500).json({ error: "Request non authorized" });
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

// TO DO gestion des images
// Modifier avatar d'un utilisateur
module.exports.updateAvatar = async (req, res) => {
  await Utilisateur.findOne({ where: { id_user: req.params.id } })
    .then((userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "User not found" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id_user == req.auth.userId || req.auth.role == 1) {
        // Nom du fichier a supprimer
        console.log("avatar", userFound.avatar);
        // let filename = userFound.avatar.split("/images/")[1];
        // console.log(filename);
        // let filename = userFound.avatar;
        if (userFound.avatar == "default.png") {
          console.log(userFound.avatar);
          console.log("img par default");
        } else {
          // Supprimer image du dossier
          console.log("file a supprime", userFound.avatar);
          fs.unlink(`images/${userFound.avatar}/`, () => {
            // Mettre à jour l'avatar
            Utilisateur.update(
              {
                // avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
                avatar: req.file.filename,
              },
              { where: { id_user: req.params.id } }
            );
            console.log(req.file.filename);
            return res.status(200).json(" Avatar update");
          });
        }
      } else {
        return res.status(500).json({ error: "Can't update Avatar" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


// TO DO supprimer l'image si elle n'est pas par default
// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  await Utilisateur.findOne({ where: { id_user: req.params.id } }).then(
    (userFound) => {
      // Verifie que l'utilisateur existe
      if (!userFound) return res.status(404).json({ error: "User not found" });
      // Acces autorisé admin ou utilisateur qui a créer le compte
      if (userFound.id_user == req.auth.userId || req.auth.role == 1) {
        // Nom du fichier a supprimer
        if (userFound.avatar !== "default.png") {
          const filename = userFound.avatar.split("/images/avatar/")[1];
          console.log("avatar nom", filename);
          // Supprimer avatar du dossier
          fs.unlink(`images/${filename}/`, () => {
            // Supprimer l'utilisateur de la BDD
            Utilisateur.destroy({
              where: {
                id_user: req.params.id,
              },
            });
            res.status(201).json("User deleted with success");
          });
        } else {
          console.log("img par default", filename);
          Utilisateur.destroy({
            where: {
              id_user: req.params.id,
            },
          });
          res.status(201).json("User deleted with success");
        }
      } else {
        return res.status(401).json({ error: "Request non authorized" });
      }
    }
  );
};
