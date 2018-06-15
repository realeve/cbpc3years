/*
Navicat MySQL Data Transfer

Source Server         : Mysql_local
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : wx_develop

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-07-29 00:21:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cbpm_research_prize
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_research_prize`;
CREATE TABLE `cbpm_research_prize` (
  `id` int(11) NOT NULL,
  `prize_name` varchar(255) DEFAULT NULL,
  `prize_num` int(11) DEFAULT NULL,
  `people_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
