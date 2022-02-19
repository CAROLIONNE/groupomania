require("dotenv").config();

// Connexion mysql
const mysql = require("mysql");

function connectDb() {
  console.log("Get connection ...");

  let conn = mysql.createConnection({
    database: process.env.database,
    host: process.env.host_sql,
    user: process.env.user_sql,
    password: process.env.password_sql,
  });

  conn.connect(function (err) {
    if (err) throw err;
    console.log("Connecté à la base de donnée");
  });

  return conn;
}

let connexion = connectDb()

// module.exports = function connectDb () {
//   console.log("Get connection ...");

//   let conn = mysql.createConnection({
//     database: process.env.database,
//     host: process.env.host_sql,
//     user: process.env.user_sql,
//     password: process.env.password_sql,
//   });

//   conn.connect(function (err) {
//     if (err) throw err;
//     console.log("Connecté à la base de donnée");
//   });

//   return conn;
// }

// function createUser(connection, Uti) {
//   let requete =
//     "INSERT INTO `utilisateur`(`MAIL`, `ROLE`, `MOT_PSW`, `TEMP_PSW`, `DAT_CREA`, `DAT_MDP`,`AVATAR`,`PSEUDONYME`,`POSTE`,`BUREAU`) VALUES (?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'default.png',?,?,?)";
//   let data = [
//     Uti.mail,
//     Uti.role,
//     Uti.psw,
//     Uti.tempPsw,
//     Uti.pseudonyme,
//     Uti.poste,
//     Uti.bureau,
//   ];
//   connection.query(requete, data, function (err) {
//     if (!err) return 0;
//     else {
//       console.log("Error Occured:" + err);
//       return 1;
//     }
//   });
// }

function createArticle(connection, Article) {
  let requete =
    "INSERT INTO `article` (`ID_USER`,`DATE_CRE`,`DAT_MOD`,`TITRE`,`MEDIA`,`TEXT`) VALUES(?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,?,?,?)";
  let data = [Article.idUti, Article.titre, Article.media, Article.text];
  connection.query(requete, data, function (err, rows, fields) {
    if (!err) return 0;
    else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

function createCommentaire(connection, Commentaire) {
  let requete =
    "INSERT INTO `commentaire` (`ID_ARTICLE`,`ID_USER`,`DATE_CRE`,`DAT_MOD`,`TITRE`,`TEXT`) VALUES(?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,?,?)";
  let data = [
    Commentaire.idArt,
    Commentaire.idUtilisateur,
    Commentaire.titre,
    Commentaire.text,
  ];
  connection.query(requete, data, function (err, rows, fields) {
    if (!err) return 0;
    else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

// function Utilisateur(
//   id,
//   mail,
//   role,
//   psw,
//   tempPsw,
//   datCrea,
//   datMdp,
//   avatar,
//   pseudonyme,
//   poste,
//   bureau
// ) {
//   this.id = id;
//   this.mail = mail;
//   this.role = role;
//   this.psw = psw;
//   this.tempPsw = tempPsw;
//   this.datCrea = datCrea;
//   this.datMdp = datMdp;
//   this.avatar = avatar;
//   this.pseudonyme = pseudonyme;
//   this.poste = poste;
//   this.bureau = bureau;
// }

// let util = new Utilisateur(
//   2,
//   "rk@jt.jp",
//   "SimpleUser",
//   "motdepasse",
//   0,
//   "2002-12-02",
//   "2003-11-01",
//   "default.png",
//   "pseudo",
//   "PDG",
//   "secretaire"
// );

// let util2 = new Utilisateur(
//   1,
//   "kro@jt.jp",
//   "SimpleUser",
//   "motdepasse2",
//   1,
//   "2002-12-02",
//   "2003-11-01",
//   "default.png",
//   "pseudo",
//   "CEO",
//   "B354"
// );
function selectUtilisateur(connection, Utilisateur) {
  let requete =
    "SELECT `ID_USER`,`MAIL`,`ROLE`,`MOT_PSW`, `TEMP_PSW`,`DAT_CREA`,`DAT_MDP`,`AVATAR`,`PSEUDONYME`,`POSTE`,`BUREAU` FROM `utilisateur` WHERE ID_USER =?";
  let data = [Utilisateur.id];
  connection.query(requete, data, function (err, res, fields) { 
    if (!err) {
      console.log("chaton", res);
      Utilisateur.mail = res[0].MAIL;
      Utilisateur.role = res[0].ROLE;
      Utilisateur.psw = res[0].MOT_PSW;
      Utilisateur.tempPsw = res[0].TEMP_PSW;
      Utilisateur.datCre = res[0].DAT_CREA;
      Utilisateur.datMdp = res[0].DAT_MDP;
      Utilisateur.avatar = res[0].AVATAR;
      Utilisateur.pseudonyme = res[0].PSEUDONYME;
      Utilisateur.poste = res[0].POSTE;
      Utilisateur.bureau = res[0].BUREAU;
      console.log(Utilisateur);
      return Utilisateur;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

// selectUtilisateur(connexion, util);

// let testCrea = createUser(connexion, util);

function Article(id, idUti, datCre, datMod, titre, media, text) {
  this.id = id;
  this.idUti = idUti;
  this.datCre = datCre;
  this.datMod = datMod;
  this.titre = titre;
  this.media = media;
  this.text = text;
}

let art = new Article(
  1,
  1,
  "",
  "",
  "titre article",
  "image.jpg",
  "bla bla bla"
);

//testArt = createArticle(connexion, art)

function selectArticle(connection, Article) {
  let requete =
    "SELECT `ID_ARTICLE`,`ID_USER`,`DATE_CRE`,`DAT_MOD`,`TITRE`,`MEDIA`,`TEXT` FROM `article` WHERE ID_ARTICLE =?";
  let data = [Article.id];
  connection.query(requete, data, function (err, res, fields) {
    if (!err) {
      Article.idUti = res[0].ID_USER;
      Article.datCre = res[0].DATE_CRE;
      Article.datMod = res[0].DAT_MOD;
      Article.titre = res[0].TITRE;
      Article.media = res[0].MEDIA;
      Article.text = res[0].TEXT;
      console.log(Article);
      return Article;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

// art.media = "toto";
// art = selectArticle(connexion, art);
// console.log("art", art);

function Commentaire(id, idArt, idUtilisateur, datCre, datMod, titre, text) {
  this.id = id;
  this.idArt = idArt;
  this.idUtilisateur = idUtilisateur;
  this.datCre = datCre;
  this.datMod = datMod;
  this.titre = titre;
  this.text = text;
}

let com = new Commentaire(1, 1, 1, "", "", "super commentaire", "hello");

function selectCommentaire(connection, Commentaire) {
  let requete =
    "SELECT `ID_COMMENTAIRE`,`ID_ARTICLE`,`ID_USER`,`DATE_CRE`,`DAT_MOD`,`TITRE`,`TEXT` FROM `commentaire` WHERE ID_COMMENTAIRE =?";
  let data = [Commentaire.id];
  connection.query(requete, data, function (err, res, fields) {
    if (!err) {
      console.log("chaton", res);
      Commentaire.idArt = res[0].ID_ARTICLE;
      Commentaire.idUtilisateur = res[0].ID_USER;
      Commentaire.datCre = res[0].DATE_CRE;
      Commentaire.datMod = res[0].DAT_MOD;
      Commentaire.titre = res[0].TITRE;
      Commentaire.text = res[0].TEXT;
      console.log(Commentaire);
      return Commentaire;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}
function getCommentOneArticle(connection, Commentaire) {
  let requete =
    "SELECT a.`ID_COMMENTAIRE`, a.`ID_ARTICLE`,a.`ID_USER`,a.`DATE_CRE`,a.`DAT_MOD`,a.`TITRE`,a.`TEXT`, b.`AVATAR`, b.`PSEUDONYME` FROM `commentaire` A, utilisateur b WHERE a.ID_USER = b.ID_USER AND ID_ARTICLE =? ORDER BY A.DATE_CRE DESC";
  let data = [Commentaire.idArt];
  connection.query(requete, data, function (err, res, fields) {
    if (!err) {
      console.log("Tout les commentaires d'un article:", res);
      Commentaire.idArt = res[0].ID_ARTICLE;
      Commentaire.idUtilisateur = res[0].ID_USER;
      Commentaire.datCre = res[0].DATE_CRE;
      Commentaire.datMod = res[0].DAT_MOD;
      Commentaire.titre = res[0].TITRE;
      Commentaire.text = res[0].TEXT;
      console.log(Commentaire);
      return Commentaire;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

// selectCommentaire(connexion, com)
// getCommentOneArticle(connexion, com);

//let testCom = createCommentaire(connexion, com);


function getArticleFromUtilisateur(connection, Article) {
  let requete =
    "SELECT a.`ID_Article`, a.`ID_USER`,a.`DATE_CRE`,a.`DAT_MOD`,a.`TITRE`,a.`MEDIA`,a.`TEXT`, b.`AVATAR`, b.`PSEUDONYME`, b.`DAT_CREA` FROM `Article` a, utilisateur b WHERE a.ID_USER = b.ID_USER AND ID_ARTICLE =? ";
  let data = [Article.id];
  connection.query(requete, data, function (err, res, fields) {
    if (!err) {
      console.log("article d'un utilisateur:", res);
      Article.idArt = res[0].ID_ARTICLE;
      Article.idUtilisateur = res[0].ID_USER;
      Article.datCre = res[0].DATE_CRE;
      Article.datMod = res[0].DAT_MOD;
      Article.titre = res[0].TITRE;
      Article.text = res[0].TEXT;
      console.log(Article);
      return Article;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}
function updtUtilisateur(connection, Utilisateur) {
  let requete = "UPDATE `utilisateur` SET `MAIL` = ?, `POSTE` = ?,`BUREAU` = ? WHERE `ID_USER` = ?";
  let data = [Utilisateur.mail, Utilisateur.poste, Utilisateur.bureau, Utilisateur.id];
  connection.query(requete, data, function (err, res, fields) {
    if (!err) {
      console.log("Mise à jour réussie");
      return 0;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}
// getArticleFromUtilisateur(connexion, art);
// updtUtilisateur(connexion, util2);

function deleteUtilisateur(connection, Utilisateur) {
	let requete = "DELETE FROM `utilisateur` WHERE `ID_USER` = ?";
	let data = [Utilisateur.id];
	connection.query(requete, data, function (err, res, fields) {
    if (!err) {
      console.log("Mise à jour réussie");
      return 0;
    } else {
      console.log("Error Occured:" + err);
      return 1;
    }
  });
}

// deleteUtilisateur(connexion, util2);