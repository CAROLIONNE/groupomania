-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: db_groupomania
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id_article` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `date_crea` datetime NOT NULL,
  `date_mod` datetime DEFAULT NULL,
  `titre` varchar(150) NOT NULL DEFAULT 'title',
  `media` varchar(150) DEFAULT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id_article`),
  UNIQUE KEY `id_article` (`id_article`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`ID_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (13,16,'2022-02-24 14:17:01','2022-04-09 18:37:51','super article','http://localhost:3000/images/planete-nature1649529471513.jpg','Update interface ok!!'),(78,16,'2022-03-18 12:53:09','2022-03-24 13:33:58','Un peu d\'aide pour une Regex ?','http://localhost:3000/images/E6lQJ1GXEAAzFVS1647607989782.jpg','Demandez a votre chat XD'),(79,16,'2022-03-18 13:45:22','2022-03-18 13:45:22','post avec images','http://localhost:3000/images/succes1647611122740.jpg','YESSSSSSSSS !!!!!!!!'),(80,16,'2022-03-22 16:39:53','2022-04-20 16:16:26','Week-end à la plage','http://localhost:3000/images/goeland1650056064914.jpg','Le sable le soleil et la mer'),(81,16,'2022-03-22 17:02:35','2022-04-18 16:38:53','Porquerolles','http://localhost:3000/images/porquerolles21650299933334.jpg','Dépaysement total =D Bon courage aux collègues =P');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaires` (
  `id_commentaire` int NOT NULL AUTO_INCREMENT,
  `id_article` int NOT NULL,
  `id_user` int NOT NULL,
  `date_crea` datetime NOT NULL,
  `date_mod` datetime DEFAULT NULL,
  `titre` varchar(150) NOT NULL DEFAULT 'title',
  `text` text NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  UNIQUE KEY `id_commentaire` (`id_commentaire`),
  KEY `id_article` (`id_article`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`id_article`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE,
  CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `utilisateurs` (`ID_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaires`
--

LOCK TABLES `commentaires` WRITE;
/*!40000 ALTER TABLE `commentaires` DISABLE KEYS */;
INSERT INTO `commentaires` VALUES (63,81,18,'2022-04-19 12:08:01','2022-04-19 12:08:01','grgr','grrgr'),(65,81,18,'2022-04-19 12:11:35','2022-04-19 12:11:35','feeee','efeeffe'),(66,81,18,'2022-04-19 12:12:46','2022-04-19 12:12:46','grgr','grgrr'),(72,81,18,'2022-04-19 13:23:28','2022-04-19 13:23:28','hrhth','hthtt'),(73,81,18,'2022-04-19 13:35:48','2022-04-19 13:35:48','gfrg','grgr'),(80,81,18,'2022-04-20 14:28:20','2022-04-20 14:28:20','','');
/*!40000 ALTER TABLE `commentaires` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220215222106-create-utilisateur.js'),('20220215225958-create-article.js'),('20220215230638-create-commentaire.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `ID_USER` int NOT NULL AUTO_INCREMENT,
  `MAIL` varchar(75) NOT NULL,
  `ROLE` varchar(10) NOT NULL DEFAULT '0',
  `MOT_PSW` varchar(70) NOT NULL,
  `TEMP_PSW` tinyint(1) NOT NULL DEFAULT '1',
  `DATE_CREA` datetime NOT NULL,
  `DATE_MDP` datetime NOT NULL,
  `AVATAR` varchar(75) DEFAULT 'default.jpg',
  `PSEUDONYME` varchar(75) NOT NULL,
  `POSTE` varchar(30) DEFAULT NULL,
  `BUREAU` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID_USER`),
  UNIQUE KEY `MAIL` (`MAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'admin@mail.fr','1','test1',0,'2022-02-16 15:41:54','2022-02-16 15:41:54','defaultadmin.jpg','Admin','DRH','108'),(16,'sylvain@gmail.fr','0','$2b$10$Ste.D.4lOx0rvMk4ErgoNOmJI1AbXyAMaSf07dltCMAfJ0Hr3HCWy',0,'2022-02-24 10:03:29','2022-02-24 10:03:29','img_profil1650363314658.jpg','Syl','electricien','12'),(18,'user@admin.fr','1','$2b$10$qVKmCTQMcPZG2EPi.BoCgeuTASqIdmUgvhPStFUPSR8vcemZSwtZ2',0,'2022-02-24 13:33:11','2022-02-24 13:33:11','succes1650373930882.jpg','admin','Administrateur réseau','10'),(60,'belmont@romain.fr','0','$2b$10$Rit1bG/5ujHMJU7fuwzLcuqlSGakIJRffl6LLAsir4zZr7op7j3/S',0,'2022-04-19 12:28:50','2022-04-19 12:28:50','default.png','jyujy',NULL,NULL);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-20 18:33:41
