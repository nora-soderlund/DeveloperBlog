-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for developer_blog
CREATE DATABASE IF NOT EXISTS `developer_blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `developer_blog`;

-- Dumping structure for table developer_blog.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `short` text CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `timestamp` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.articles: ~0 rows (approximately)
INSERT INTO `articles` (`id`, `slug`, `title`, `content`, `short`, `timestamp`) VALUES
	(1, 'restricting-a-google-maps-api-key', 'Restricting a Google Maps API key', '<p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p>\r\n\r\n<p>Think of it as a password. You wouldn\'t want to be throwing your password around to anybody, would you?</p>\r\n\r\n<p>Essentially, an API key is a password - but it\'s even more powerful! You don\'t need an user name or e-mail to identify yourself with an API key, you only need the key.</p>\r\n\r\n<p>This is why it\'s good practice to always keep your key private. It should be straight-forward, right? Unfortunately it can be a bit confusing for newer developers because the context matters!</p>\r\n\r\n<p>If you\'re using the JavaScript API, Android SDK, iOS SDK, or the Embed API: then you must create a public API key and if you don\'t restrict it properly, you can end up with a massive bill from Google...</p>\r\n\r\n<div class="article-image">\r\n    <img alt="" src="https://i.imgur.com/rkfCpWA.png"/>\r\n\r\n    <p>\r\n        <span class="article-image-alt">Yikes! This person got a €10,000 bill!</span>\r\n        <span class="article-image-source">Source: <a href="https://www.reddit.com/r/googlecloud/comments/lagnic/comment/hs2lgau/?utm_source=share&utm_medium=web2x&context=3">reddit.com</a></span>\r\n    </p>\r\n</div>\r\n\r\n<p>With that said, you should always restrict your API keys properly, whether it\'s public or not. The Google Maps documentation has great coverage on restricting keys but the Google Cloud console can be a bit frightening to use, so I will do my best to guide you through the most common case uses!</p>\r\n\r\n<div class="article-tabs">\r\n    <div class="article-tabs-header">\r\n        <a class="article-tab" href="#javascript-api" default>JavaScript API</a>\r\n        <a class="article-tab" href="#android-sdk">Android SDK</a>\r\n        <a class="article-tab" href="#ios-sdk">iOS SDK</a>\r\n        <a class="article-tab" href="#embed-api">Embed API</a>\r\n    </div>\r\n\r\n    <div class="article-tabs-content">\r\n        <div id="javascript-api" class="article-tab-content">\r\n            {CODE 1}\r\n\r\n            <p>Nec sollicitudin sem rhoncus quis. Curabitur sed blandit ex, sit amet convallis dui. Aliquam pretium suscipit erat eget malesuada. Sed vitae pretium odio, non varius lorem. Maecenas feugiat ligula urna, in fringilla diam molestie nec. Morbi ut tincidunt erat.</p>\r\n            \r\n            <p>Vivamus mollis turpis vel sapien sagittis porta. Praesent scelerisque nec velit id dictum. Donec facilisis libero nec felis convallis lacinia. Aenean commodo metus turpis, nec venenatis diam scelerisque vel. Sed velit nibh, dignissim ac ullamcorper sit amet, volutpat ac nisl. Quisque et tortor eu dolor ultrices sagittis non et ante.</p>            \r\n        </div>\r\n        \r\n        <div id="android-sdk" class="article-tab-content">\r\n            {CODE 2}\r\n\r\n            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus consequat, nisl ac ornare gravida, augue arcu interdum ligula, eget accumsan leo quam a sapien. Curabitur vehicula congue libero, sit amet aliquet eros sagittis a.</p>\r\n        </div>\r\n        \r\n        <div id="ios-sdk" class="article-tab-content">\r\n            {CODE 1}\r\n\r\n            <p>Nec sollicitudin sem rhoncus quis. Curabitur sed blandit ex, sit amet convallis dui. Aliquam pretium suscipit erat eget malesuada. Sed vitae pretium odio, non varius lorem. Maecenas feugiat ligula urna, in fringilla diam molestie nec. Morbi ut tincidunt erat.</p>\r\n            \r\n            <p>Vivamus mollis turpis vel sapien sagittis porta. Praesent scelerisque nec velit id dictum. Donec facilisis libero nec felis convallis lacinia. Aenean commodo metus turpis, nec venenatis diam scelerisque vel. Sed velit nibh, dignissim ac ullamcorper sit amet, volutpat ac nisl. Quisque et tortor eu dolor ultrices sagittis non et ante.</p>            \r\n        </div>\r\n        \r\n        <div id="embed-api" class="article-tab-content">\r\n            {CODE 2}\r\n\r\n            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus consequat, nisl ac ornare gravida, augue arcu interdum ligula, eget accumsan leo quam a sapien. Curabitur vehicula congue libero, sit amet aliquet eros sagittis a.</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n', '<p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p><p>Read more on how to properly manage your Google Maps API keys.</p>', 1671640640785),
	(2, 'font-made-for-programming', 'Font made for programming', '<p><a href="https://github.com/tonsky/FiraCode" target="_blank">FiraCoda</a> is a free monospaced font containing ligatures for common programming multi-character combinations.</p>\r\n\r\n<p>Read more about how you can integrate this font into your code editor.</p>\r\n', '<p><a href="https://github.com/tonsky/FiraCode" target="_blank">FiraCoda</a> is a free monospaced font containing ligatures for common programming multi-character combinations.</p>\r\n\r\n<p>Read more about how you can integrate this font into your code editor.</p>\r\n', 1671747318292);

-- Dumping structure for table developer_blog.article_tags
CREATE TABLE IF NOT EXISTS `article_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article` int NOT NULL,
  `tag` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.article_tags: ~0 rows (approximately)
INSERT INTO `article_tags` (`id`, `article`, `tag`) VALUES
	(1, 1, 1),
	(2, 2, 2);

-- Dumping structure for table developer_blog.codes
CREATE TABLE IF NOT EXISTS `codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(50) COLLATE utf8mb4_swedish_ci NOT NULL,
  `code` text COLLATE utf8mb4_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.codes: ~0 rows (approximately)
INSERT INTO `codes` (`id`, `language`, `code`) VALUES
	(1, 'javascript', 'function initMap() {\r\n    map = new google.maps.Map(document.getElementById("map"), {\r\n        center: { lat: -34.397, lng: 150.644 },\r\n        zoom: 8,\r\n    });\r\n}'),
	(2, 'html', '<script\r\n    src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap&v=weekly"\r\n    defer\r\n    ></script>');

-- Dumping structure for table developer_blog.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.tags: ~0 rows (approximately)
INSERT INTO `tags` (`id`, `slug`, `text`) VALUES
	(1, 'google-maps', 'Google Maps'),
	(2, 'code-editor', 'Code Editor');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
