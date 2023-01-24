-- --------------------------------------------------------
-- Host:                         135.125.200.162
-- Server version:               8.0.31 - MySQL Community Server - GPL
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
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `short` text CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `network` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci DEFAULT NULL,
  `timestamp` bigint NOT NULL,
  `hidden` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.articles: ~4 rows (approximately)
INSERT INTO `articles` (`id`, `slug`, `title`, `content`, `description`, `short`, `network`, `timestamp`, `hidden`) VALUES
	(1, 'restricting-a-google-maps-api-key', 'Restricting a Google Maps API key', '<p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p>\r\n\r\n<p>Think of it as a password. You wouldn\'t want to be throwing your password around to anybody, would you?</p>\r\n\r\n<p>Essentially, an API key is a password - but it\'s even more powerful! You don\'t need an user name or e-mail to identify yourself with an API key, you only need the key.</p>\r\n\r\n<p>This is why it\'s good practice to always keep your key private. It should be straight-forward, right? Unfortunately it can be a bit confusing for newer developers because the context matters!</p>\r\n\r\n<p>If you\'re using the JavaScript API, Android SDK, iOS SDK, or the Embed API: then you must create a public API key and if you don\'t restrict it properly, you can end up with a massive bill from Google...</p>\r\n\r\n<div class="article-image">\r\n    <iframe class="article-embed article-reddit-embed" src="https://www.redditmedia.com/r/googlecloud/comments/lagnic/massive_bill_occured/hs2lgau/?depth=1&amp;showmore=false&amp;embed=true&amp;showmedia=false&amp;showedits=false&amp;created=2022-12-26T19%3A08%3A42.313Z" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="218" width="640" scrolling="no"></iframe>\r\n\r\n    <p>\r\n        <span class="article-image-alt">Yikes! This person got a €10,000 bill!</span>\r\n        <span class="article-image-source">Source: <a href="https://www.reddit.com/r/googlecloud/comments/lagnic/comment/hs2lgau/?utm_source=share&utm_medium=web2x&context=3">reddit.com</a></span>\r\n    </p>\r\n</div>\r\n\r\n<p>With that said, you should always restrict your API keys properly, whether it\'s public or not.</p>\r\n\r\n<p>The Google Maps documentation has <a href="https://developers.google.com/maps/api-security-best-practices" target="_blank" rel="noreferrer">great coverage on restricting keys</a> but the Google Cloud console can be a bit frightening to use, so I will do my best to guide you through the most common case uses!</p>\r\n\r\n<h3>API restrictions</h3>\r\n\r\n<p>Google provides two restriction methods: application restrictions and <b>API restrictions</b>, which is <b>restricting each of your API key to specific APIs</b>.</p>\r\n\r\n<p>You should only enable the APIs that your API key is meant to use, otherwise, if a malicious user gets ahold of your key and your <i>application restriction</i> isn\'t enough to hold them off, they can start abusing a lot more APIs on your behalf.</p>\r\n\r\n<div class="article-tabs">\r\n    <div class="article-tabs-header">\r\n        <a class="article-tab" href="#javascript-and-embed-api" default>JavaScript & Embed API</a>\r\n        <a class="article-tab" href="#android-sdk">Android SDK</a>\r\n        <a class="article-tab" href="#ios-sdk">iOS SDK</a>\r\n    </div>\r\n\r\n    <div class="article-tabs-content">\r\n        <div id="javascript-and-embed-api" class="article-tab-content">\r\n            <p>This is how a call to the JavaScript API looks like, and as you can see, here - the API key is intended to be public. There\'s no point trying to hide it at all, because it will be public no matter what.</p>\r\n            \r\n            <syntax-highlight code="1"></syntax-highlight>\r\n\r\n            <p>This also applies to wrappers for e.g. React, they all use the same thing in the background - embed the Google Maps JavaScript API with the API key visible.</p>\r\n            \r\n            <p>Furthermore, this also includes the Embed API, which does the same thing:</p>\r\n            \r\n            <syntax-highlight code="5"></syntax-highlight>\r\n            \r\n            <p>External sources are <i>always</i> visible on the client.</p>\r\n            \r\n            <p>Remember, it\'s technically the user making the request, not you!</p>\r\n            \r\n            <h3>Application restrictions</h3>\r\n            \r\n            <p>Google provides a good <a href="https://developers.google.com/maps/api-security-best-practices" target="_blank" rel="noreferrer">API security best practices</a> article, I recommend you give it a good read.</p>\r\n            \r\n            <p>Following their recommendation, you should restrict your key for the JavaScript API (<i>including Direction Services, Distance Matrix Service, Elevation Service, Geocoding Service, and Places Library <b>when used in the JavaScript API</b></i>) through a HTTP referer restriction.</p>\r\n        \r\n            <p>This means that you restrict usage of your API key to a specific list of accepted domains. For example, if I had embedded a map on this page, I would\'ve used <syntax-highlight inline>nora-soderlund.se</syntax-highlight> as the referer restriction.</p>\r\n        </div>\r\n        \r\n        <div id="android-sdk" class="article-tab-content">\r\n             <h3>This section is under maintenance.</h3>\r\n\r\n            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus consequat, nisl ac ornare gravida, augue arcu interdum ligula, eget accumsan leo quam a sapien. Curabitur vehicula congue libero, sit amet aliquet eros sagittis a.</p>\r\n        </div>\r\n        \r\n        <div id="ios-sdk" class="article-tab-content">\r\n             <h3>This section is under maintenance.</h3>\r\n        \r\n            <p>Nec sollicitudin sem rhoncus quis. Curabitur sed blandit ex, sit amet convallis dui. Aliquam pretium suscipit erat eget malesuada. Sed vitae pretium odio, non varius lorem. Maecenas feugiat ligula urna, in fringilla diam molestie nec. Morbi ut tincidunt erat.</p>\r\n        </div>\r\n    </div>\r\n</div>', 'I often see developers not understanding the importance of managing their Google Maps API key properly. Read more on how to properly manage your Google Maps API keys.', '<p>I often see developers not understanding the importance of managing their Google Maps API key properly.</p>\r\n\r\n<p>Read more on how to properly manage your Google Maps API keys.</p>\r\n', NULL, 1671640640785, 0),
	(2, 'font-made-for-programming', 'Font made for programming', '<p><a href="https://github.com/tonsky/FiraCode" target="_blank">Fira Code</a> is a free monospaced font containing ligatures for common programming multi-character combinations.</p>\r\n\r\n<blockquote>\r\n        <h3><a href="https://github.com/tonsky/FiraCode#problem" target="_blank" referrer="noreferrer">Problem</a></h3>\r\n        <p>Programmers use a lot of symbols, often encoded with several characters. For the human brain, sequences like <code>-></code>, <code><=</code> or <code>:=</code> are single logical tokens, even if they take two or three characters on the screen. Your eye spends a non-zero amount of energy to scan, parse and join multiple characters into a single logical one. Ideally, all programming languages should be designed with full-fledged Unicode symbols for operators, but that’s not the case yet.</p>\r\n        \r\n        <h3><a href="https://github.com/tonsky/FiraCode#solution" target="_blank" referrer="noreferrer">Solution</a></h3>\r\n        <p>Fira Code is a free monospaced font containing ligatures for common programming multi-character combinations. This is just a font rendering feature: underlying code remains ASCII-compatible. This helps to read and understand code faster. For some frequent sequences like <code>..</code> or <code>//</code>, ligatures allow us to correct spacing.</p>\r\n</blockquote>\r\n\r\n<p>That quote sums it up better than I can. If you still don\'t understand what it really does, I use Fira Code on my blog.</p>\r\n\r\n<p>See the difference between Fira Code and Monospace below:</p>\r\n\r\n<syntax-highlight code="3" lines="7"></syntax-highlight>\r\n\r\n<syntax-highlight code="3" lines="7" font="monospace"></syntax-highlight>\r\n\r\n<p>It\'s such a huge difference, I love it and I think you would too if you code a lot.</p>\r\n\r\n<p>Here\'s how you can add it to your code editor: <a href="https://github.com/tonsky/FiraCode#editor-compatibility-list" target="_blank" referrer="noreferrer">Editor Compability List</a></p>', 'Fira Code is a free monospaced font containing ligatures for common programming multi-character combinations. Read more about how you can integrate this font into your code editor.', '<p><a href="https://github.com/tonsky/FiraCode" target="_blank">Fira Code</a> is a free monospaced font containing ligatures for common programming multi-character combinations.</p>\r\n\r\n<p>Read more about how you can integrate this font into your code editor.</p>\r\n', NULL, 1671747318292, 0),
	(3, 'flowchart-and-online-diagram-software', 'Flowchart and online diagram software', '<p>I stumbled across <a href="https://draw.io" target="_blank" rel="referrer">draw.io</a> when looking for a substitute of Microsoft Visio to create a server infrastructure chart.</p>\r\n\r\n<p>I wanted to visualize my server infrastructure in the read me of my <a href="/projects/ride-tracker">Ride Tracker</a> project, because who doesn\'t want to be fancy?</p>\r\n\r\n<p>It took me less than a few minutes to get some nice looking and <b>consistent</b> sprites for the entire chart!</p>\r\n\r\n<img src="/images/articles/flowchart-and-online-diagram-software/infrastructure.svg">\r\n\r\n<p>Exports are available in just about any common format as well, <a href="https://draw.io" target="_blank" rel="referrer">visit draw.io</a>!</p>\r\n\r\n', 'I stumbled across draw.io when looking for a substitute of Microsoft Visio to create a server infrastructure chart. Read more on how to draw infrastructure images with draw.io   ', '<p>I stumbled across <a href="https://draw.io" target="_blank" rel="referrer">draw.io</a> when looking for a substitute of Microsoft Visio to create a server infrastructure chart.</p>\r\n\r\n<p>Read more on how I used <a href="https://draw.io" target="_blank" rel="referrer">draw.io</a> to visualize my server infrastructure.</p>\r\n', NULL, 1672082393169, 0),
	(4, 'source-maps-are-enabled-by-default-in-react', 'Source maps are enabled by default in React', '<p>I recently made quite the discovery that the source maps for your source files, are enabled by default, in React.</p>\r\n\r\n<p>This is generally something that you may not want in public production builds. Even though any code ran in a browser is accessible, there\'s several reasons you don\'t want that code to be de-obfuscated and shipped with all your private comments.</p>\r\n\r\n<h3>Your website can now be <i>cloned</i>.</h3>\r\n\r\n<p>I do not mean that your website <i>can\'t</i> be cloned without the source map. It\'s entirely doable, however, with the source code, your website can be cloned way easier and you could now have to compete with another platform - using your own code.</p>\r\n\r\n<p>Your frontend code is useless without a backend, but now that your competitor has your source code with all your comments and readable parameters, they can just as easily emulate your backend!</p>\r\n\r\n<p>When Adobe Flash games were popular, <a href="https://habbo.com" target="_blank" rel="noreferrer">Habbo Hotel</a> was thriving for years. Then users wanting to play without having to pay for furnitures decided they wanted to copy Habbo Hotel.</p>\r\n\r\n<p>So they did it. Using Habbo Hotel\'s own flash files for the frontend, they used various methods to reverse engineer and crack the communication protocol to then create a server that emulates that of Habbo Hotel\'s servers.</p>\r\n\r\n<p>But what wasn\'t doable during all these years (over a decade!) was <b>modifying the frontend client</b>...because it was obfuscated and hardly possible to work in! Had the source code for the frontend been accessible during all these years, I\'m <b>certain</b> that Habbo Hotel would not have survived!</p>\r\n\r\n<h3>Sensitive comments can accidentally be left public.</h3>\r\n\r\n<p>Sometimes when you\'re coding, you might leave comments that may or may not be considered sensitive. In this case, I\'m mostly referring to links to internal tools used by your organization.</p>\r\n\r\n<p>Usually, internal tools are locked behind a local VPN by the organization and can\'t be accessed by the world wide web and in other cases - that would be a whole another security issue to discuss.</p>\r\n\r\n<p>Regardless, if a malicious user would find a comment containing a link to an internal tool, this can be a major piece in their <a href="https://en.wikipedia.org/wiki/Social_engineering_(security)" target="_blank" rel="referrer">social engineering</a> attack.</p>\r\n\r\n<p>I have myself come across 3 different links to internal platforms at a large organization, that was left in comments in the source map. I notified them of this and they promptly removed their source map from the public.</p>\r\n\r\n<h3>How do I turn off source maps?</h3>\r\n\r\n<p>If you have read through my reasoning for calling public source maps - bad practice; and want turn off source maps in production for React:</p>\r\n\r\n<p>You can either in your server, when serving <code>*.map</code> files - only approve the request when the address is local, or, if you wish to remove them altogether:</p>\r\n\r\n<p>In your <code>build</code> script, assign a value of <code>false</code> to a <code>GENERATE_SOURCEMAP</code> environment variable, as such:</p>\r\n\r\n<syntax-highlight code="4"></syntax-highlight>\r\n', 'I recently made quite the discovery that the source maps for your compiled Node.JS source files, are enabled by default in React! Read more about why I think this is bad practice and how you can resolve it.', '<p>I recently made quite the discovery that the source maps for your compiled Node.JS source files, are enabled by default in React!</p>\r\n\r\n<p>Read more about why I think this is bad practice and how you can resolve it.</p>\r\n', 'https://programmer.network/nora-soderlund/source-maps-are-enabled-by-default-in-react', 1672451516373, 0);

-- Dumping structure for table developer_blog.article_feedback
CREATE TABLE IF NOT EXISTS `article_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article` int NOT NULL,
  `remoteAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `positive` int NOT NULL,
  `timestamp` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.article_feedback: ~2 rows (approximately)
INSERT INTO `article_feedback` (`id`, `article`, `remoteAddress`, `positive`, `timestamp`) VALUES
	(65, 1, '::ffff:162.158.222.254', 1, 1673192785720),
	(66, 4, '::ffff:162.158.222.131', 1, 1673192885487),
	(67, 1, '::ffff:162.158.222.224', 1, 1674582857440);

-- Dumping structure for table developer_blog.article_tags
CREATE TABLE IF NOT EXISTS `article_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article` int NOT NULL,
  `tag` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.article_tags: ~6 rows (approximately)
INSERT INTO `article_tags` (`id`, `article`, `tag`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 2, 3),
	(4, 3, 3),
	(5, 4, 4),
	(6, 4, 5);

-- Dumping structure for table developer_blog.codes
CREATE TABLE IF NOT EXISTS `codes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `code` text CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.codes: ~5 rows (approximately)
INSERT INTO `codes` (`id`, `language`, `code`) VALUES
	(1, 'html', '<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap&v=weekly" defer></script>'),
	(2, 'html', '<script\r\n    src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap&v=weekly"\r\n    defer\r\n    ></script>'),
	(3, 'javascript', 'if(number !== null) {\r\n    throw new Error("Number is null!");\r\n}\r\n\r\nif(number <= 0 || number >= 100) {\r\n    throw new Error("Number is out of bounds!");\r\n}\r\n'),
	(4, 'batch', 'set="GENERATE_SOURCEMAP=false" && react-scripts build'),
	(5, 'html', '<iframe src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=Space+Needle,Seattle+WA"></iframe>');

-- Dumping structure for table developer_blog.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci DEFAULT NULL,
  `color` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci DEFAULT NULL,
  `shimmer` int NOT NULL DEFAULT '0',
  `priority` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

-- Dumping data for table developer_blog.tags: ~5 rows (approximately)
INSERT INTO `tags` (`id`, `slug`, `text`, `icon`, `color`, `shimmer`, `priority`) VALUES
	(1, 'featured', 'Featured', 'fas-fire', '#C44715', 1, 2),
	(2, 'google-maps', 'Google Maps', 'fab-google', NULL, 0, 0),
	(3, 'tools', 'Tools', 'fas-wrench', NULL, 0, 0),
	(4, 'react', 'React', 'fab-react', NULL, 0, 0),
	(5, 'security', 'Security', 'fas-shield-halved', NULL, 0, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
