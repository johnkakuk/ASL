-- MySQL dump 10.13  Distrib 8.0.46, for Linux (aarch64)
--
-- Host: localhost    Database: wdv442_space_tracker
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Galaxies`
--

DROP TABLE IF EXISTS `Galaxies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Galaxies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `galaxyName` varchar(255) NOT NULL,
  `galaxySize` int NOT NULL,
  `galaxyDescription` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Galaxies`
--

LOCK TABLES `Galaxies` WRITE;
/*!40000 ALTER TABLE `Galaxies` DISABLE KEYS */;
INSERT INTO `Galaxies` VALUES (1,'Galaxy 1',100000,'Demo galaxy 1'),(2,'Galaxy 2',200000,'Demo galaxy 2'),(3,'Galaxy 3',300000,'Demo galaxy 3');
/*!40000 ALTER TABLE `Galaxies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Planets`
--

DROP TABLE IF EXISTS `Planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Planets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `planetName` varchar(255) NOT NULL,
  `planetSize` int NOT NULL,
  `planetDescription` text,
  `StarId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `StarId` (`StarId`),
  CONSTRAINT `planets_ibfk_1` FOREIGN KEY (`StarId`) REFERENCES `Stars` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Planets`
--

LOCK TABLES `Planets` WRITE;
/*!40000 ALTER TABLE `Planets` DISABLE KEYS */;
INSERT INTO `Planets` VALUES (1,'Planet A1',101,'Demo planet A1 orbiting Star A in Galaxy 1',1),(2,'Planet A2',102,'Demo planet A2 orbiting Star A in Galaxy 1',1),(3,'Planet A3',103,'Demo planet A3 orbiting Star A in Galaxy 1',1),(4,'Planet B1',104,'Demo planet B1 orbiting Star B in Galaxy 1',2),(5,'Planet B2',105,'Demo planet B2 orbiting Star B in Galaxy 1',2),(6,'Planet B3',106,'Demo planet B3 orbiting Star B in Galaxy 1',2),(7,'Planet C1',107,'Demo planet C1 orbiting Star C in Galaxy 1',3),(8,'Planet C2',108,'Demo planet C2 orbiting Star C in Galaxy 1',3),(9,'Planet C3',109,'Demo planet C3 orbiting Star C in Galaxy 1',3),(10,'Planet A1',110,'Demo planet A1 orbiting Star A in Galaxy 2',4),(11,'Planet A2',111,'Demo planet A2 orbiting Star A in Galaxy 2',4),(12,'Planet A3',112,'Demo planet A3 orbiting Star A in Galaxy 2',4),(13,'Planet B1',113,'Demo planet B1 orbiting Star B in Galaxy 2',5),(14,'Planet B2',114,'Demo planet B2 orbiting Star B in Galaxy 2',5),(15,'Planet B3',115,'Demo planet B3 orbiting Star B in Galaxy 2',5),(16,'Planet C1',116,'Demo planet C1 orbiting Star C in Galaxy 2',6),(17,'Planet C2',117,'Demo planet C2 orbiting Star C in Galaxy 2',6),(18,'Planet C3',118,'Demo planet C3 orbiting Star C in Galaxy 2',6),(19,'Planet A1',119,'Demo planet A1 orbiting Star A in Galaxy 3',7),(20,'Planet A2',120,'Demo planet A2 orbiting Star A in Galaxy 3',7),(21,'Planet A3',121,'Demo planet A3 orbiting Star A in Galaxy 3',7),(22,'Planet B1',122,'Demo planet B1 orbiting Star B in Galaxy 3',8),(23,'Planet B2',123,'Demo planet B2 orbiting Star B in Galaxy 3',8),(24,'Planet B3',124,'Demo planet B3 orbiting Star B in Galaxy 3',8),(25,'Planet C1',125,'Demo planet C1 orbiting Star C in Galaxy 3',9),(26,'Planet C2',126,'Demo planet C2 orbiting Star C in Galaxy 3',9),(27,'Planet C3',127,'Demo planet C3 orbiting Star C in Galaxy 3',9);
/*!40000 ALTER TABLE `Planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20260425021328-create-galaxy.js'),('20260427015856-create-stars-planets.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stars`
--

DROP TABLE IF EXISTS `Stars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `starName` varchar(255) NOT NULL,
  `starSize` int NOT NULL,
  `starDescription` text,
  `GalaxyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `GalaxyId` (`GalaxyId`),
  CONSTRAINT `stars_ibfk_1` FOREIGN KEY (`GalaxyId`) REFERENCES `Galaxies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stars`
--

LOCK TABLES `Stars` WRITE;
/*!40000 ALTER TABLE `Stars` DISABLE KEYS */;
INSERT INTO `Stars` VALUES (1,'Star A',1001,'Demo star A in Galaxy 1',1),(2,'Star B',1002,'Demo star B in Galaxy 1',1),(3,'Star C',1003,'Demo star C in Galaxy 1',1),(4,'Star A',1004,'Demo star A in Galaxy 2',2),(5,'Star B',1005,'Demo star B in Galaxy 2',2),(6,'Star C',1006,'Demo star C in Galaxy 2',2),(7,'Star A',1007,'Demo star A in Galaxy 3',3),(8,'Star B',1008,'Demo star B in Galaxy 3',3),(9,'Star C',1009,'Demo star C in Galaxy 3',3);
/*!40000 ALTER TABLE `Stars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StarsPlanets`
--

DROP TABLE IF EXISTS `StarsPlanets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StarsPlanets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `StarId` int DEFAULT NULL,
  `PlanetId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `StarId` (`StarId`),
  KEY `PlanetId` (`PlanetId`),
  CONSTRAINT `starsplanets_ibfk_1` FOREIGN KEY (`StarId`) REFERENCES `Stars` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `starsplanets_ibfk_2` FOREIGN KEY (`PlanetId`) REFERENCES `Planets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StarsPlanets`
--

LOCK TABLES `StarsPlanets` WRITE;
/*!40000 ALTER TABLE `StarsPlanets` DISABLE KEYS */;
INSERT INTO `StarsPlanets` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,3,7),(8,3,8),(9,3,9),(10,4,10),(11,4,11),(12,4,12),(13,5,13),(14,5,14),(15,5,15),(16,6,16),(17,6,17),(18,6,18),(19,7,19),(20,7,20),(21,7,21),(22,8,22),(23,8,23),(24,8,24),(25,9,25),(26,9,26),(27,9,27);
/*!40000 ALTER TABLE `StarsPlanets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-27  3:06:49
