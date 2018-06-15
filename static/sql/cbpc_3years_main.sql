CREATE TABLE `cbpc_3years_main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `openid` varchar(100) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `rec_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `islucky` int(11) NOT NULL COMMENT '幸运用户',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`),
  KEY `country` (`country`),
  KEY `province` (`province`),
  KEY `city` (`city`),
  KEY `islucky` (`islucky`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
