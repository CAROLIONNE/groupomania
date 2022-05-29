USE grp; -- Remplacer 'grp' par le nom de votre base de donnée
DROP TABLE IF EXISTS `commentaires`;
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE `utilisateurs`
(
   id  			         int not null auto_increment,
   mail                 char(75) not null unique,
   isAdmin               bool not null,
   mot_psw              char(70) not null,
   temp_psw             bool not null,
   createdAt             datetime not null,
   updatedAt              datetime not null,
   avatar               char(75) not null,
   pseudonyme           char(30) not null,
   poste                char(25),
   bureau               char(15),
   PRIMARY KEY (id)
);

CREATE TABLE `articles`
(
   id           int not null auto_increment,
   utilisateurId              int not null,
   createdAt            datetime not null,
   updatedAt              datetime,
   titre                char(150) not null,
   media                varchar(150),
   text                 text not null,
   PRIMARY KEY (id),
   FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `commentaires`
(
   id           int not null auto_increment,
	articleId              int not null,
   utilisateurId              int not null,
   createdAt            datetime not null,
   updatedAt              datetime,
   text                 text not null,
   PRIMARY KEY (id),
   FOREIGN KEY (utilisateurId) REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `utilisateurs` ( `mail`, `isAdmin`, `mot_psw`, `pseudonyme`)
VALUES 
('admin@email.fr', '1', 'Admin2022', 'Admin'),
('user@email.fr', '0', 'User2022', 'Caroline');

