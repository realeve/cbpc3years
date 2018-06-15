SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `cbpm_research_luckyuser`;
CREATE TABLE `cbpm_research_luckyuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `rec_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
