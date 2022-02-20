// const connexion = require('../db');
// let connexion = require('db.connectDb')

function Utilisateur(
  id,
  mail,
  role,
  psw,
  tempPsw,
  datCrea,
  datMdp,
  avatar,
  pseudonyme,
  poste,
  bureau
) {
  this.id = id;
  this.mail = mail;
  this.role = role;
  this.psw = psw;
  this.tempPsw = tempPsw;
  this.datCrea = datCrea;
  this.datMdp = datMdp;
  this.avatar = avatar;
  this.pseudonyme = pseudonyme;
  this.poste = poste;
  this.bureau = bureau;
}

module.exports = Utilisateur();

// let util = new Utilisateur(
//   3,
//   "rk@jt.fr",
//   "SimpleUser",
//   "motdepasse",
//   0,
//   "2002-12-02",
//   "2003-11-01",
//   "default.png",
//   "keke",
//   "developpeur",
//   "12"
// );


function createUser(connection, Uti) {
  let requete =
    "INSERT INTO `utilisateur`(`MAIL`, `ROLE`, `MOT_PSW`, `TEMP_PSW`, `DAT_CREA`, `DAT_MDP`,`AVATAR`,`PSEUDONYME`,`POSTE`,`BUREAU`) VALUES (?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'default.png',?,?,?)";
  let data = [
    Uti.mail,
    Uti.role,
    Uti.psw,
    Uti.tempPsw,
    Uti.pseudonyme,
    Uti.poste,
    Uti.bureau,
  ];
  connection.query(requete, data, function (err) {
    if (!err) return 0;
    else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

// let testCrea = createUser(connexion, util);

// // const sequelize = require("../db.js");

// // const { Sequelize, Model, DataTypes } = require("sequelize");




// const bcrypt = require("bcrypt");

// class Utilisateur extends Model {

// }

// Utilisateur.init(
//   {
//     id_user: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       unique: true,
//       allowNull: false,
//     },
//     mail: {
//       type: DataTypes.STRING(75),
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.STRING(10),
//       defaultValue: "simpleUser",
//       allowNull: false,
//     },
//     mot_psw: {
//       type: DataTypes.STRING(70),
//       allowNull: false,
//       set(value) {
//         const hash = bcrypt.hashSync(value, 10);
//         this.setDataValue("mot_psw", hash);
//       },
//     },
//     temp_psw: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//       allowNull: false,
//     },
//     date_crea: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//       allowNull: false,
//     },
//     date_mdp: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//       allowNull: false,
//     },
//     avatar: {
//       type: DataTypes.STRING(75),
//       defaultValue: "default.jpg",
//       allowNull: false,
//     },
//     pseudonyme: {
//       type: DataTypes.STRING(30),
//       allowNull: false,
//     },
//     poste: {
//       type: DataTypes.STRING(25),
//     },
//     bureau: {
//       type: DataTypes.STRING(15),
//     },
//   },
//   {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: "Utilisateur", // We need to choose the model name
//     tableName: "utilisateur",
//     timestamps: false,
//   }
  
// );

// (async () => {
// //   await utilisateur.sync({ force: true });
// // console.log("The table for the Utilisateur model was just (re)created!");
//   })();

// // console.log(Utilisateur === sequelize.models.Utilisateur);

// // const user = Utilisateur.build({
// //   mail: "meimei@free.fr",
// //   mot_psw: "test2",
// //   pseudonyme: "lili",
// // });
// // console.log(user);

// // user.save()
// // .catch(err => console.log(err))

// sequelize.query('SELECT * FROM utilisateur', (err, res) => {
//   if(err) throw err;
//   console.log(res);
// })

