/*
 Navicat Premium Data Transfer

 Source Server         : php
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : chanel

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 08/03/2020 01:15:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'yoyo', '123456');
INSERT INTO `user` VALUES (2, 'yiyou', '123456');
INSERT INTO `user` VALUES (3, '张艺友', '456789');
INSERT INTO `user` VALUES (4, 'zhangyiyou', '456789');
INSERT INTO `user` VALUES (5, 'yoyo1', '123456');
INSERT INTO `user` VALUES (7, 'demo', '159357');
INSERT INTO `user` VALUES (8, 'test', '741852');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
