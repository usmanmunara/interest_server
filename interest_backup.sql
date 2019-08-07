/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Users` (
  `id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `password` varchar(100) NOT NULL,
  `paymentStatus` tinyint(1) NOT NULL DEFAULT '0',
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `props` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Users
# ------------------------------------------------------------

INSERT INTO
  `Users` (
    `id`,
    `email`,
    `fullName`,
    `salt`,
    `password`,
    `paymentStatus`,
    `emailVerified`,
    `props`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    '723d7685-93eb-4c30-9060-f45de6995519',
    'jtgg01@gmail.com',
    'John Guibas',
    'cdLbPiQ5G+B4D7Qb3XaBcb6nQk6SN6hL',
    '4rEG501/0pcQNNN0n/VlLn7H0X0WEsNRndqK0vLTIlaF/v0wNi9VkI+5/WZs3XKBt738POdf/gn8n4XggR0GNA==',
    0,
    1,
    NULL,
    '2019-08-06 06:03:31',
    '2019-08-06 06:03:55'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
