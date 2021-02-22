/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MariaDB
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : covid

 Target Server Type    : MariaDB
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 19/02/2021 10:09:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pasien
-- ----------------------------
DROP TABLE IF EXISTS `pasien`;
CREATE TABLE `pasien`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NULL DEFAULT NULL,
  `tanggal` date NOT NULL,
  `no_pasien` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usia` int(11) NOT NULL,
  `status` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` date NULL DEFAULT NULL,
  `updated_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pasien
-- ----------------------------
INSERT INTO `pasien` VALUES (28, 1, '2021-02-18', '0012', 34, 'Meninggal', '2021-02-17', '2021-02-19');
INSERT INTO `pasien` VALUES (29, 2, '2021-02-18', '0013', 32, 'Sembuh', '2021-02-18', '2021-02-19');
INSERT INTO `pasien` VALUES (30, NULL, '2021-02-19', '0014', 12, 'Dirawat', '2021-02-19', NULL);
INSERT INTO `pasien` VALUES (31, NULL, '2021-02-19', '0015', 14, 'Sembuh', '2021-02-19', NULL);

SET FOREIGN_KEY_CHECKS = 1;
