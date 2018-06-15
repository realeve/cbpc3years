/*
Navicat MySQL Data Transfer

Source Server         : MYSQL
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : weixin

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-06-05 21:41:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cbpm_research_detail
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_research_detail`;
CREATE TABLE `cbpm_research_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `research_main_id` int(11) DEFAULT NULL,
  `que0` varchar(255) DEFAULT NULL,
  `que1` varchar(255) DEFAULT NULL,
  `que2` varchar(255) DEFAULT NULL,
  `que3` varchar(255) DEFAULT NULL,
  `que4` varchar(255) DEFAULT NULL,
  `que5` varchar(255) DEFAULT NULL,
  `que6` varchar(255) DEFAULT NULL,
  `que7` varchar(255) DEFAULT NULL,
  `que8` varchar(255) DEFAULT NULL,
  `que9` varchar(255) DEFAULT NULL,
  `que10` varchar(255) DEFAULT NULL,
  `que11` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `research_main_id` (`research_main_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
