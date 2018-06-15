/*
Navicat MySQL Data Transfer

Source Server         : Mysql_local
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : wx_develop

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-07-28 21:20:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for wx_cbpm_research
-- ----------------------------
DROP TABLE IF EXISTS `cbpm_research`;
CREATE TABLE `cbpm_research` (
  `id` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `rec_time` datetime DEFAULT NULL,
  KEY `province` (`province`,`city`,`questionId`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
