CREATE TABLE IF NOT EXISTS `cbpm_research_main` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `dept_id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
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
  KEY `openid` (`openid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
