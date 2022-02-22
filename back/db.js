require("dotenv").config();


//Connexion BDD sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.database,
  process.env.user_sql,
  process.env.password_sql,
  {
    host: process.env.host_sql,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;


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

// getCommentOneArticle(connexion, com);



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
