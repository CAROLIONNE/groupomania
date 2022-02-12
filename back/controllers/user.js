 const bcrypt = require('bcrypt');
 const dataBase = require('../db');
 const Utilisateur = require('../models/User');


require('dotenv').config();

// Inscription
module.exports.signup = (req, res) => {
    bcrypt
    // Cryptage du mot de passe 
    .hash(req.body.password, 10)
    // Creer nouvel utilisateur
    .then((hash) => {
      const utilisateur = new Utilisateur({
        email: req.body.mail,
        password: hash,
      });
      // Sauvegarde dans la data base
      user
      .then ((utilisateur) => {
        dataBase.query("INSERT INTO utilisateur (mail,role,mot_psw,temp_psw,dat_crea,dat_mdp,avatar,pseudonyme) VALUES ('alex@de.fr', 0,'test2', 0, '2022-02-12.10.19.00.0000', '2022-02-12.10.19.00.0000', 'img', 'alex')", function (err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          console.log(result);
        });
      })
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }));
};


// dataBase.query(newUser.then(([results, metadata]) => {
//     console.log(results);
//   }))
 
// dataBase.query("INSERT INTO utilisateur (mail,role,mot_psw,temp_psw,dat_crea,dat_mdp,avatar,pseudonyme) VALUES ('alex@de.fr', 0,'test2', 0, '2022-02-12.10.19.00.0000', '2022-02-12.10.19.00.0000', 'img', 'alex')", function (err, result, fields) {
//     // if any error while executing above query, throw error
//     if (err) throw err;
//     // if there is no error, you have the result
//     console.log(result);
//   });