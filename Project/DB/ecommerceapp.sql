-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerceapp
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (5,'Bruno','brunoadmin@gmail.com','$2y$10$qZ0OoyX8bhAVxDFM/fx8leZSZwlyq15c1C/KTnaqDLSx6eCDJ0VpC','0'),(8,'Harry Den','harryden@gmail.com','$2y$10$YKSDtra7v2wH6ORYfry8Ue9t49pk1AvQvdJGuq4lDvFLEcx.kP6Mq','0');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_title` text NOT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'HP'),(2,'Samsung'),(3,'Apple'),(4,'Sony'),(5,'LG'),(6,'OnePlus+'),(7,'Excl'),(8,'Aduro'),(9,'Dr. Martens'),(10,'Hot Toys');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `p_id` int NOT NULL,
  `ip_add` varchar(250) NOT NULL,
  `user_id` int DEFAULT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_title` text NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Electronics'),(3,'Home & Kitchen'),(4,'Tools & Home Improvement'),(5,'CDs & Vinyl'),(6,'Clothings'),(12,'Mobiles'),(13,'Automotive Parts & Accessories'),(14,'Toys');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  `trx_id` varchar(255) NOT NULL,
  `p_status` varchar(20) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,'9L434522M7706801A','Completed'),(2,1,2,1,'9L434522M7706801A','Completed'),(3,1,3,1,'9L434522M7706801A','Completed'),(4,1,1,1,'8AT7125245323433N','Completed');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_cat` int NOT NULL,
  `product_brand` int NOT NULL,
  `product_title` varchar(255) NOT NULL,
  `product_price` int NOT NULL,
  `product_qty` int NOT NULL,
  `product_desc` text NOT NULL,
  `product_image` text NOT NULL,
  `product_keywords` text NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_product_cat` (`product_cat`),
  KEY `fk_product_brand` (`product_brand`),
  CONSTRAINT `fk_product_brand` FOREIGN KEY (`product_brand`) REFERENCES `brands` (`brand_id`),
  CONSTRAINT `fk_product_cat` FOREIGN KEY (`product_cat`) REFERENCES `categories` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,12,2,'Samsung Galaxy Z Fold 2',1399,5,'Last yearâ€™s Galaxy Fold was a sort of experiment in the field of foldable phones. The idea was an innovative one but the phone faced a lot of durability issues. Its launch was postponed multiple times because of Samsungâ€™s inability to solve all the problems. Samsung will likely avoid those situations with its successor.','1616500092_sm-zfold.jpg','samsung, mobile, galaxy fold'),(2,12,3,'Iphone 12 Pro Max',1099,7,'5G goes Pro. A14 Bionic rockets past every other smartphone chip. The Pro camera system takes low-light photography to the next level â€” with an even bigger jump on iPhone 12 Pro Max. And Ceramic Shield delivers four times better drop performance.','1616499931_iph12pm.jpg','apple, iphone'),(4,12,2,'Samsung Galaxy S21 Ultra',1079,10,'This is a demo','1616492395_Samsung-Galaxy-S21-Ultra-1608287647-0-0.jpg','samsung, s21, s21 ultra'),(5,12,6,'OnePlus 8T',329,13,'On spec-sheet, the OnePlus 8T boasts plenty of improvements from its predecessor i.e. the OnePlus 8. For instance, its 6.55-inch 1080p OLED display now comes with a faster 120Hz refresh rate. In comparison, the OnePlus 8 had a 90Hz refresh rate. This upgrade seems huge. However, users will agree that you canâ€™t really find much of a difference between 90Hz to 120Hz on a smartphone screen.','1616500410_OnePlus-8T-5G-Lunar-Silver-8GB-RAM-128GB-Storage-image-4.jpg','one plus, oneplus8'),(10,2,8,'Aduro Wireless Headphones',25,6,'Amazing Bluetooth headphones sound with aptX technology. High-quality built-in microphone with Bluetooth 5.0 technology','1616502854_hdphn.jpg','headphone, aduro'),(11,6,9,'Dr. Martens Mens Patch',75,3,'Color: Grey/Charcoal/Dark Grey','1616503181_Dr. Martens.jpg','dr martens, shoes'),(19,6,7,'Mens Hoodie',34,4,'Colors: Black/White/Maroon','1616504885_menshoodie.jpg','hood, hoodie'),(20,14,10,'Thanos Hot Toys',428,19,'Thanos sixth scale collectible figure.','1616506942_thanos-hottoys.jpg','thanos, marvel, toys, hot toys'),(24,3,5,'LG - 6.3 Cu. Ft. ',1799,5,'Smart Slide-In True Convection Range with EasyClean, InstaView, and Air Fry','1658247281_6450195_sd.jpg','oven, kitchen, cooking'),(25,5,4,'Folklore Album',15,15,'Album by Taylor Swift','1658247953_Taylor_Swift_-_Folklore.png','music, Taylor Swift, cd');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `address1` varchar(300) NOT NULL,
  `address2` varchar(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'Christine','Randolph','randolphc@gmail.com','25f9e794323b453885f5181f1b624d0b','8389080183','2133  Hill Haven Drive','Terra Stree'),(2,'Will','Willams','willainswill@gmail.com','25f9e794323b453885f5181f1b624d0b','8389080183','4567  Orphan Road','WI'),(3,'Demo','Name','demo@gmail.com','password','9876543210','demo ad1','ademo ad2'),(5,'Steeve','Rogers','steeve1@gmail.com','305e4f55ce823e111a46a9d500bcb86c','9876547770','573  Pinewood Avenue','MN'),(6,'Melissa','Gilbert','gilbert@gmail.com','305e4f55ce823e111a46a9d500bcb86c','7845554582','1711  McKinley Avenue','MA'),(7,'Nguyen','An','greenlantern2116@gmail.com','48e03915a80e6ae6953aef8a20d980fb','0977627910','www.localhost.com','address'),(8,'Truong','Nguyen','truongann260101@gmail.com','f27e6c69a62c16b1ef121695f70e65f9','0977627910','www.localhost.com','address'),(9,'NGUYEN','AN','an.nt194724@gmail.com','d00dd123ccbb1b94187301c963074ca5','0123456789','www.localhost.com','localhost'),(10,'demo','user','demo1@gmail.com','04c2677a12f9cd80d4497a0831d6f543','0123456789','address1','address2');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-20  7:41:27
