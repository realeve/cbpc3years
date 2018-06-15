CREATE TABLE `cbpc_3years_luckyuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `rec_time` datetime DEFAULT NULL,
  `prize_level` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
