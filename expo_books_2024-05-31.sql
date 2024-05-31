# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: expo_books
# Generation Time: 2024-05-31 17:25:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table books
# ------------------------------------------------------------

DROP TABLE IF EXISTS `books`;

CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookName` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `desc` text,
  `cover` text,
  `status` varchar(255) DEFAULT NULL,
  `typeId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;

INSERT INTO `books` (`id`, `bookName`, `author`, `desc`, `cover`, `status`, `typeId`, `userId`, `created_at`, `updated_at`)
VALUES
	(1,'Soul','Disney','Joe is a middle-school band teacher whose life hasn\'t quite gone the way he expected. His true passion is jazz. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.','/1716629681349.jpg','Read','1','1','2024-05-25 17:36:17','2024-05-26 11:48:07'),
	(2,'aaa','bbb','hhggghhhh','/1716644610113.jpg','Unread','3','1','2024-05-25 21:43:52','2024-05-25 21:43:52'),
	(4,'abbbggh','b','c','/1716682655153.jpg','Unread','12','2','2024-05-26 08:17:50','2024-05-26 10:40:16');

/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reviews
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `review` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `bookId` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;

INSERT INTO `reviews` (`id`, `review`, `userId`, `bookId`, `created_at`, `updated_at`)
VALUES
	(3,'ffff','1','1','2024-05-25 23:27:05','2024-05-25 23:27:05');

/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fontSize` float DEFAULT NULL,
  `userId` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;

INSERT INTO `settings` (`id`, `fontSize`, `userId`, `created_at`, `updated_at`)
VALUES
	(1,14,2,'2024-05-26 10:16:38','2024-05-26 10:25:11'),
	(2,14,1,'2024-05-26 10:24:54','2024-05-26 11:48:38');

/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `types`;

CREATE TABLE `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;

INSERT INTO `types` (`id`, `title`, `color`, `userId`, `created_at`, `updated_at`)
VALUES
	(1,'Science Fiction','rgb(23, 1, 93)','1','2024-05-25 16:50:29','2024-05-25 16:50:29'),
	(2,'Crime/Thriller','rgb(21, 125, 126)','1','2024-05-25 16:50:42','2024-05-25 16:50:42'),
	(3,'Fantasy','rgb(94, 33, 12)','1','2024-05-25 16:50:48','2024-05-25 16:50:48'),
	(4,'Classic Literature','rgb(107, 83, 93)','1','2024-05-25 16:50:56','2024-05-25 16:50:56'),
	(5,'Self-help/Motivational','rgb(112, 89, 39)','1','2024-05-25 16:51:04','2024-05-25 16:51:04'),
	(12,'test1','rgb(3, 110, 85)','2','2024-05-26 08:17:21','2024-05-26 08:17:21');

/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `headpic` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `pwd`, `nickname`, `headpic`, `created_at`, `updated_at`)
VALUES
	(1,'tom','$2b$10$pDTRL.Q98CbHH8ERs1Td7.jLlrgPSIkznyeYlJzN88bQ/724HjKFe','tom','/1716544265540.jpg','2024-05-24 16:50:55','2024-05-24 17:51:07'),
	(2,'mike','$2b$10$6MpUGFu7GUWlyruLh9u3vu6mohuQY3wOFGEad7wOFn7ah8gxZppx2','mike','/pic8.png','2024-05-25 23:50:11','2024-05-25 23:50:11');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
