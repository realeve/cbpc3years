CREATE TABLE `cbpc_3years_prize` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prize_name` varchar(255) DEFAULT NULL,
  `prize_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cbpc_3years_prize
-- ----------------------------
INSERT INTO `cbpc_3years_prize` VALUES ('1', '一等奖', '3');
INSERT INTO `cbpc_3years_prize` VALUES ('2', '二等奖', '5');
INSERT INTO `cbpc_3years_prize` VALUES ('3', '三等奖', '50');
