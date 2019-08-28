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
    '0c0fb649-2a6f-453d-9809-6261abaf8fc5',
    'sitiho@hd-mail.com',
    'Bus Down',
    'b6Xqba3HNu18M8yQyNGr9q/5rGnTkAnn',
    'PeatdkGnVcjKgqO/byAamhyCHwAPkteFpVk14xDJQJqhAUm/D/wPyFtumDGDiwJ5IBbcFj320ZwxXOakGRoRVA==',
    0,
    0,
    NULL,
    '2019-08-20 04:13:43',
    '2019-08-20 04:13:43'
  );
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
    '1a56da35-40e3-4b09-b4cb-98b34eff6a9c',
    'usmanfarooqmunara@gmail.com',
    'Muhammad Usman Farooq',
    '/DFrCT1xiH7dsPAFHPonnMZnRxHGwwXz',
    '9Iz5/7pMmBdrtaPYd5Zj6uPef8w3gBaAPRwdEMbHo9sMzwD9R/L/WOTBU3Apnkldzg/7YP0XSivy1mpxMFO0FA==',
    0,
    1,
    NULL,
    '2019-08-16 04:16:27',
    '2019-08-19 08:38:58'
  );
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
    '67638906-23b9-40e9-ac19-8b67d5e6a455',
    'cuhotiyic@omegafive.net',
    'Henry Ford',
    'EPocNTgZuyV2dwiTcQ8rFBs0h4a6Jbq2',
    'myNab5raI1ABlYALKgOQUZkoKGf6uKxToGJF30Lmu5iPS52eNgbFJCfzDCHWf19W+GboXtdc5NQ4DXPzrBGOCQ==',
    1,
    1,
    NULL,
    '2019-08-20 03:31:50',
    '2019-08-20 03:58:19'
  );
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
    '7a7b4560-662a-490f-a5a2-f12e079d7abe',
    'fazila@five-plus.net',
    'Red Bull',
    '2jLd+7k0e7HUW71Tnd4grlpWS/aAhc5F',
    'irpdEIhdEFTZ4dFVm58DVRHRXqx0ymb6Of2jp08bhvqATSivI0+pVxs5L+6KOfukffNlDTGv5U8vZgcW6LVLxw==',
    0,
    1,
    NULL,
    '2019-08-20 04:06:16',
    '2019-08-20 04:07:24'
  );
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
    '8ee3462a-11d5-4a59-bade-c73030d53d6a',
    'toniluya@vimail24.com',
    'Julian Castro',
    '9dRCc4mM5Si2AMtHDcHHJ2KfbGCWvPuY',
    'zP+TAxfvkWl4wTwOT/afBGo8JWj0q9duddsQ1YFsUvE5TXZlIBnlqbRuRRzuYKnbRW9NITCj3WdPYCHTUDJuSw==',
    0,
    1,
    NULL,
    '2019-08-19 21:42:20',
    '2019-08-19 21:46:42'
  );
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
    '93824881-e931-41bd-b672-5e28845b7ec1',
    'jtgg01@gmail.com',
    'john',
    'pLbmh7LBezVe85AGxMqA9Y2+wFT4dVDt',
    'Aqx7loSs0BUwMSi6sRul3gKqglackEJXU3kEd6/tukcY4jyOLgIh6YOgJAcf2jmXMXV8zgoEuAlXF8vtQVz5yw==',
    1,
    1,
    NULL,
    '2019-08-16 04:20:34',
    '2019-08-16 04:33:43'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
