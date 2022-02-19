const bcrypt = require("bcrypt");
// const sequelize = require("../db.js");
const Utilisateur = require("../models/User");
const db = require("../db");

require("dotenv").config();



// module.exports.getOneUser = (req, res) => {
//   const userFound = Utilisateur.findOne({
//     where: { id_user: req.params.id_user }
// }).catch(err => console.log(err))

// if(foundUser){
//     res.status(200).json({ message: `userfound : ${userFound.pseudonyme}`})
// }else{
//     res.status(404).json( {error : "User not found"} )
// }
// }

// module.exports.getOneUser = async (req, res) => {
//   const userFound = await Utilisateur.findOne({
//     order: ['id_user']
// }).catch(err => console.log(err))

// if(foundUser){
//     res.status(200).json({ message: `userfound : ${userFound.pseudonyme}`})
// }else{
//     res.status(404).json( {error : "User not found"} )
// }
// }

// module.exports.signup =  (req, res) => {
//   try{
//     const user = new Utilisateur({
//       mail: req.body.mail,
//       mot_psw: req.body.mot_psw,
//       pseudonyme: req.body.pseudonyme, })
//       ;
//       console.log("user's pseudo:", user.pseudonyme);
//     } catch(error){
//       console.log(error);
//     }
// }

// module.exports.signup = async (req, res) => {
//     await Utilisateur.create({
//       mail: req.body.mail,
//       mot_psw: req.body.mot_psw,
//       pseudonyme: req.body.pseudonyme,
//     })
//     .catch(err => console.log(err))
//     res.json("Compte créé");
//   };

// Inscription
// module.exports.signup = async (req, res) => {
//   bcrypt
//     // Cryptage du mot de passe
//     .hash(req.body.psw, 10)
//     // Creer nouvel utilisateur
//     .then((hash) => {
//       const utilisateur = new Utilisateur(
//         "",
//         req.body.mail,
//         0,
//         hash,
//         0,
//         "",
//         "",
//         "",
//         req.body.pseudonyme,
//         req.body.poste,
//         req.body.bureau
//       );
//       // Sauvegarde dans la data base
//       utilisateur
//         .then((utilisateur) => createUser(conn, utilisateur))
//         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//         .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// dataBase.query(newUser.then(([results, metadata]) => {
//     console.log(results);
//   }))

// dataBase.query("INSERT INTO utilisateur (mail,role,mot_psw,temp_psw,dat_crea,dat_mdp,avatar,pseudonyme) VALUES ('alex@de.fr', 0,'test2', 0, '2022-02-12.10.19.00.0000', '2022-02-12.10.19.00.0000', 'img', 'alex')", function (err, result, fields) {
//     // if any error while executing above query, throw error
//     if (err) throw err;
//     // if there is no error, you have the result
//     console.log(result);
//   });







