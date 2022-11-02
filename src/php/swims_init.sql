-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: kapserver.ccaqldgdfw6m.ap-south-1.rds.amazonaws.com
-- Generation Time: Nov 02, 2022 at 03:07 PM
-- Server version: 5.7.38-log
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cubebioapi_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `billings`
--

CREATE TABLE `billings` (
  `billing_id` int(11) NOT NULL,
  `supervisor_id` varchar(255) NOT NULL,
  `customer_id` varchar(255) NOT NULL,
  `house_no` varchar(100) DEFAULT NULL,
  `customer_address` text NOT NULL,
  `amount` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billings`
--

INSERT INTO `billings` (`billing_id`, `supervisor_id`, `customer_id`, `house_no`, `customer_address`, `amount`, `created_at`) VALUES
(1, '2', '4', '457df324', 'main road', '500', '2022-10-22 08:44:22'),
(2, '2', '8', '3-124-1/456', 'main road', '50', '2022-10-22 08:44:23'),
(3, '6', '11', '3-124-1/456', 'main road', '', '2022-10-22 08:44:23'),
(4, '9', '12', '165', 'Bachupally', '20', '2022-10-22 08:44:23'),
(5, '9', '13', '167', 'Bachupally', '100', '2022-10-22 08:44:23'),
(6, '9', '14', '158', 'zcxvzxc', '', '2022-10-22 08:44:23');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `status` int(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `customer_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `status`, `user_id`, `customer_type_id`) VALUES
(5, 'Hospitals', 1, 3, 3),
(6, 'Shops', 1, 3, 3),
(7, 'Hotels', 1, 3, 3),
(8, 'Independent', 1, 3, 4),
(9, 'Apartment', 1, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `charges_id` int(11) NOT NULL,
  `customer_type` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `charges` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `charges`
--

INSERT INTO `charges` (`charges_id`, `customer_type`, `category_id`, `sub_category_id`, `project_id`, `charges`) VALUES
(1, 3, 5, 1, 3, '500'),
(2, 3, 5, 2, 3, '50'),
(3, 4, 9, NULL, 1, '20'),
(4, 4, 8, 8, 1, '30'),
(5, 3, 5, 2, 1, '100'),
(6, 3, 5, 1, 1, '75');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `state_id`, `city_name`, `user_id`, `status`) VALUES
(3, 2, 'Hyderabad', 3, 1),
(4, 2, 'Warangal', 3, 1),
(5, 4, 'Bengaluru', 3, 1),
(6, 3, 'Vijayawada', 3, 1),
(7, 2, 'Secunderabad', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer_types`
--

CREATE TABLE `customer_types` (
  `customer_type_id` int(11) NOT NULL,
  `customer_type` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_types`
--

INSERT INTO `customer_types` (`customer_type_id`, `customer_type`, `user_id`, `status`) VALUES
(3, 'Commercial', 3, 1),
(4, 'Residential', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dummy`
--

CREATE TABLE `dummy` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `role_id` int(11) NOT NULL COMMENT '1=>admin,2=>supervisor,3=>customers',
  `created_by` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `house_no` varchar(255) DEFAULT NULL,
  `state_id` varchar(60) DEFAULT NULL,
  `city_id` varchar(60) DEFAULT NULL,
  `ward_id` varchar(255) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `locality` varchar(60) DEFAULT NULL,
  `postalcode` varchar(20) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `customer_type` varchar(100) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dummy`
--

INSERT INTO `dummy` (`id`, `user_id`, `role_id`, `created_by`, `name`, `email`, `mobile`, `house_no`, `state_id`, `city_id`, `ward_id`, `project_id`, `address`, `locality`, `postalcode`, `unit`, `customer_type`, `category_id`, `sub_category_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 'super 1', 'superadmincubebio@gmail.com', '8532147002', '', '1', '1', '1', 3, 'main road', 'near bustop', '500032', '2', '3', 5, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(2, 2, 3, 1, 'supervisor 1', 'supervisorcubebio@gmail.com', '9874563210', '', '1', '1', '1', 0, 'main road', 'gachibowli', '500084', '2', '3', 5, 2, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(3, 3, 3, 1, 'sup2', 'admincubebio@gmail.com', '9874563210', '', '1', '1', '1', 0, 'main road', 'gachibowli', '500084', '2', '3', 5, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(4, 1, 3, 2, 'sup 3', 'customer1@gmail.com', '8532147001', NULL, '1', '1', '1', 3, 'main road', 'near bustop', '500032', '1', '2', 5, 2, '2022-10-13 10:05:15', '2022-10-13 10:05:15'),
(5, 6, 3, 1, 'sup 4', 'supervisor@gmail.com', '8532147005', NULL, '1', '1', '1', 3, 'main road', 'near bustop', '500032', '1', '3', 5, 1, '2022-10-15 11:57:36', '2022-10-15 11:57:36'),
(6, 8, 3, 3, 'sup 5', 'ashok.alluri@inducosolutions.com', '9966911011', NULL, '2', '3', '2', 0, 'dfasdfsd', 'fsdafsad', '500082', '1', '3', 5, 2, '2022-10-17 14:08:35', '2022-10-17 14:08:35'),
(7, 9, 3, 3, 'sup 6', 'ashokalluri@gmail.com', '7799911011', NULL, '2', '3', '3', 0, 'hyd', 'hyd', '500090', '1', '3', 5, 1, '2022-10-17 14:15:19', '2022-10-17 14:15:19'),
(8, 1, 3, 1, 'super 11', 'superadmincubebio@gmail.com', '8532147002', '', '1', '1', '1', 3, 'main road', 'near bustop', '500032', '2', '3', 5, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(9, 2, 3, 1, 'supervisor 11', 'supervisorcubebio@gmail.com', '9874563210', '', '1', '1', '1', 0, 'main road', 'gachibowli', '500084', '2', '3', 5, 2, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(10, 3, 3, 1, 'sup22', 'admincubebio@gmail.com', '9874563210', '', '1', '1', '1', 0, 'main road', 'gachibowli', '500084', '2', '3', 5, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(11, 1, 3, 2, 'sup 33', 'customer1@gmail.com', '8532147001', NULL, '1', '1', '1', 3, 'main road', 'near bustop', '500032', '1', '2', 5, 2, '2022-10-13 10:05:15', '2022-10-13 10:05:15'),
(12, 6, 3, 1, 'sup 44', 'supervisor@gmail.com', '8532147005', NULL, '1', '1', '1', 3, 'main road', 'near bustop', '500032', '1', '3', 5, 1, '2022-10-15 11:57:36', '2022-10-15 11:57:36'),
(13, 8, 3, 3, 'sup 55', 'ashok.alluri@inducosolutions.com', '9966911011', NULL, '2', '3', '2', 0, 'dfasdfsd', 'fsdafsad', '500082', '1', '3', 5, 2, '2022-10-17 14:08:35', '2022-10-17 14:08:35'),
(14, 9, 3, 3, 'sup 66', 'ashokalluri@gmail.com', '7799911011', NULL, '2', '3', '3', 0, 'hyd', 'hyd', '500090', '1', '3', 5, 1, '2022-10-17 14:15:19', '2022-10-17 14:15:19'),
(15, 1, 3, 1, 'super 111', 'superadmincubebio@gmail.com', '8532147002', '', '1', '1', '1', 3, 'main road', 'near bustop', '500032', '2', '3', 5, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(16, 2, 3, 1, 'supervisor 111', 'supervisorcubebio@gmail.com', '9874563210', '', '1', '1', '1', 0, 'main road', 'gachibowli', '500084', '2', '3', 5, 2, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(17, 3, 3, 1, 'sup222', 'admincubebio@gmail.com', '9874563210', '', '1', '1', '1', 0, 'main road', 'gachibowli', '500084', '2', '3', 5, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(18, 1, 3, 2, 'sup 333', 'customer1@gmail.com', '8532147001', NULL, '1', '1', '1', 3, 'main road', 'near bustop', '500032', '1', '2', 5, 2, '2022-10-13 10:05:15', '2022-10-13 10:05:15'),
(19, 6, 3, 1, 'sup 444', 'supervisor@gmail.com', '8532147005', NULL, '1', '1', '1', 3, 'main road', 'near bustop', '500032', '1', '3', 5, 1, '2022-10-15 11:57:36', '2022-10-15 11:57:36'),
(20, 8, 3, 3, 'sup 555', 'ashok.alluri@inducosolutions.com', '9966911011', NULL, '2', '3', '2', 0, 'dfasdfsd', 'fsdafsad', '500082', '1', '3', 5, 2, '2022-10-17 14:08:35', '2022-10-17 14:08:35'),
(21, 9, 3, 3, 'sup 666', 'ashokalluri@gmail.com', '7799911011', NULL, '2', '3', '3', 0, 'hyd', 'hyd', '500090', '1', '3', 5, 1, '2022-10-17 14:15:19', '2022-10-17 14:15:19');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `access_token` text COLLATE utf8mb4_unicode_ci,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `access_token`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('211e4d1b39d7eeada12dc2655df9eee389b92ff6119403ee26d50d20f5dfc21ca2b42b159f419273', 1, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjExZTRkMWIzOWQ3ZWVhZGExMmRjMjY1NWRmOWVlZTM4OWI5MmZmNjExOTQwM2VlMjZkNTBkMjBmNWRmYzIxY2EyYjQyYjE1OWY0MTkyNzMiLCJpYXQiOjE2NjYxNjgzNzEuOTc1ODAyLCJuYmYiOjE2NjYxNjgzNzEuOTc1ODA3LCJleHAiOjE2ODE4OTMxNzEuOTYwNzQsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.WtDup5mYh3gs5AONaHFq5ehEzxBkXcotpBM4IOB-9slegvluMgHt2u5khC_DWzliqcLsjApvncI21uD8OzhmC2SF9xoKmshFGJPkJ4qHvIk7L3sqJnYPjX8imgeHl1sDPcsd9OD472Mv25jWWlnlf_CDn-V0AY3vbclFFV7LbkPCUwg3wMciXFv4GRMXJ0ALbth5TX6FkhXrYRwsD6mZs4Ut_5UKOJrJdcFDsY-Z73EFTe7Nce_FNHIBYAnYXyAJtQ8uHhfsTCcyetfNxvwOdmQ9YdahF4R4L_W5pfBVIwWI36U_umvof7ufEM1Bu3g1Bx88UZxSmQktlFxtrEQ8kaeVFAC93ntNj5uGiRsRUC-O5O5BJJk4aFRGKzl-fjCgBqP7DYPrte_PGCyimD3nekU_L2N_yc3S_9_wmiWShV_LdtWpA61Pe0aY1nNVh6H-zkmWyHGayuiLX0r-oiRhtl5xdGhE1_ki56-S8rKU_mJpOaED8AntJap26koofE2-z70fz_Dmj7I_mRH8PkGqJUAkn763ILZIB-2PtJGPDWhmgOjabrrnmHj3_2g4uEd1wWVbdP0NO0YcL8Clb3BMAtGZSOxYNBzsgWGX0L1T5DRBerGHG-RunVbQFVv5_WMBsQxssNgTPDGqHGbCtkeUnYEE8KQ_5J8FBhkVdJz4_7U', 'intersell', '[]', 0, '2022-10-19 08:32:51', '2022-10-19 08:32:51', '2023-04-19 08:32:51'),
('4ba554e31cf4732646ddc5de7e6c640ca3a7c11cb159db5dd5221448bfe700124df348ddf48643d5', 3, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGJhNTU0ZTMxY2Y0NzMyNjQ2ZGRjNWRlN2U2YzY0MGNhM2E3YzExY2IxNTlkYjVkZDUyMjE0NDhiZmU3MDAxMjRkZjM0OGRkZjQ4NjQzZDUiLCJpYXQiOjE2NjczMDM0MTQuMDYxNDUzLCJuYmYiOjE2NjczMDM0MTQuMDYxNDU4LCJleHAiOjE2ODI5NDE4MTQuMDU1MjEsInN1YiI6IjMiLCJzY29wZXMiOltdfQ.O6B4lQOJEoQ1OM4MXQ0i4qaJ5mhBhyHCYA_6zIhmmMPyeg7wG1hgyi-iyrYZdaT92uYfDCtU7ajaWhkpvEMrP-Qmfp1E0SALrgtRRdrxgtWQjG3wh9hf5kpZ9JO9jQVhWpi19vh26igQC0Esj5VAMr_Z3_G6r61HzZWy4um5Nl4IWnZ4fmLFCYIjvWmtCuZf2FRrFXF8-J1pHYv8W9C3RK37AURLiwp1ptZfTh2kOPg0oTqtc5R4VxH7_kCO7qlnaTSudjdFndKAS7U2chplLicJhfjXu6EW2h7DqE9UMWby2GoGkJcE1b1LlF3DEbpomawjMVZmijAAqVE96gqElaMvUai9Te0nhI1h5H4AsAQNTAmyhJVhNZIkiD4qJ5jzwIor2rtbKdrESfTMoac9mxtNoFw4ucigyXCnZy92R_iv5HOYu1QrIAxDodYcmZQM-d8yep8xzdkGN4A5FVbwd6lvaMl7cA2Gueqb1Az984lv1Zd2JUOFa4Owfq6MJi52STcvo0Cyjdjh7OhCqulNW0pk-VXnNCZ1cmmhwvDj3R7TX38guKAceT6NelpwObNNXRWoG9RK_M_GGSzmv2gxEW-I4l6UM2rDD7HBdHQxByScm8zWnx36WND1yfajOfU9VV9jdc2eAK6bhDzBIkGwBaQAz88UtA4GbWj7-Wi3sIw', 'intersell', '[]', 0, '2022-11-01 11:50:14', '2022-11-01 11:50:14', '2023-05-01 11:50:14'),
('bb36c64f438e577a594c7994ed1fabf30f90af20525d961bcd322398c6aa978cc499441e49eba361', 9, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmIzNmM2NGY0MzhlNTc3YTU5NGM3OTk0ZWQxZmFiZjMwZjkwYWYyMDUyNWQ5NjFiY2QzMjIzOThjNmFhOTc4Y2M0OTk0NDFlNDllYmEzNjEiLCJpYXQiOjE2NjcyOTk4ODAuMjk2MTYyLCJuYmYiOjE2NjcyOTk4ODAuMjk2MTY2LCJleHAiOjE2ODI5MzgyODAuMjc4NzQyLCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.NwlxvYo0HWKgKFa7ZyGIbpKWBbvNjKq6luhgXD3Ys6N_ZhoL3gaB27ltu9lkhzr5BqwboV_phfa59RoMEzVLAWv0mx--jpICh6J8OmAVsEEfEilDlCt4kJhzeMXqYlK6sj9VlHoUycy0H6ofqHuAinjXNdauqXDLGL9WVZFBcqLGP3IVAhe97--iJZos5ZDKjKaVcy1kW7NlQ4nGnrIoe9n0hyyBynU6t_9WYqyw1jmBXcXHiU-HaZwexyKVegQwIVAetMNXppkXvDpNl3b-zFbftwOZFQ5y3Aw7Zv_3pCO3aSd1eDSDFK1XE05UftoRc74yPC4EnWtlrdsVX9Lo5XvB9RFLTmbW-RWPurnRIowJuKdI9jqLV68EYA1T6Gs0olrVvoySDJpmHFeUICceQ7vuLyR-XCWIDML9H5pY3ccb2WWDy_VVbAUdvkXPouV__MpEgj96uHVa8S4HbIYjIVkUUfd6giigHkxgmwze68bGOjqBFFk1FEcipoi51o7wkawfzyiZ34jRrtYI0l3482ZEazdF1docg1SF7DD3cv4ETSfBKQcd-NuZZoFuxkUliqWPw7QCFiFT_7ITmlwSYHmalL2BvESZitDyGz_hpMEF1PWgaPDwTYX9cS_AbMV5uiiN8H0k9E4nb9bfIX2TrWIVAF6I_eTS4yzirHqfhCg', 'intersell', '[]', 0, '2022-11-01 10:51:20', '2022-11-01 10:51:20', '2023-05-01 10:51:20');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'UsMIFd5AiNyLzMZi5bMIHzzsiKLww0LskFrBkygC', NULL, 'http://localhost', 1, 0, 0, '2021-08-30 09:02:08', '2021-08-30 09:02:08'),
(2, NULL, 'Laravel Password Grant Client', 'YB0G8gXmFVAHq1AgRByJ7blr19nXFAt2eKEgTnnf', 'users', 'http://localhost', 0, 1, 0, '2021-08-30 09:02:08', '2021-08-30 09:02:08');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(2, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `customer_address_id` int(11) NOT NULL COMMENT 'this is autoid from user_details table',
  `supervisor_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `project_ward_id` int(11) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `payment_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `customer_address_id`, `supervisor_id`, `project_id`, `project_ward_id`, `amount`, `payment_type`, `created_at`) VALUES
(1, 12, 10, 1, 4, '20', 'cash', '2022-10-22 09:06:51'),
(3, 13, 9, 1, 4, '100', 'cash', '2022-10-22 08:18:58'),
(4, 13, 9, 1, 4, '100', 'cash', '2022-10-27 05:33:30');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_type_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_name`, `project_type_id`, `description`, `user_id`, `status`, `created_at`) VALUES
(1, 'Telangana Project', 3, 'one of the new projects', 3, 1, '2022-10-19 14:18:06'),
(2, 'Andhra Project', 3, 'Andhra Pradesh Project', 3, 1, '2022-10-19 14:20:38'),
(3, 'Telangana BioMining', 5, 'Telangana BioMining', 3, 1, '2022-10-19 14:26:56'),
(4, 'new project india', 3, 'about new project', 1, 1, '2022-10-19 14:28:19'),
(5, 'Telangana P&D', 4, 'dfasfads fad fsd', 3, 1, '2022-10-19 14:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `project_types`
--

CREATE TABLE `project_types` (
  `project_type_id` int(11) NOT NULL,
  `project_type_name` varchar(255) NOT NULL,
  `status` int(1) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_types`
--

INSERT INTO `project_types` (`project_type_id`, `project_type_name`, `status`, `user_id`) VALUES
(3, 'C&T', 1, 3),
(4, 'P&D', 1, 3),
(5, 'Bio mining', 1, 3),
(9, 'MRF', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `project_wards`
--

CREATE TABLE `project_wards` (
  `project_ward_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `ward_number` varchar(255) NOT NULL,
  `ward_name` varchar(255) NOT NULL,
  `state_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL COMMENT 'if a ward is split then we use this',
  `status` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_wards`
--

INSERT INTO `project_wards` (`project_ward_id`, `project_id`, `ward_number`, `ward_name`, `state_id`, `city_id`, `parent_id`, `status`, `created_at`, `user_id`) VALUES
(1, 1, '1', 'first ward', 2, 3, NULL, 1, '2022-10-19 10:18:58', 1),
(2, 1, '2', 'second wards', 2, 3, NULL, 1, '2022-10-19 11:36:00', 1),
(3, 1, '3', 'third ward', 2, 4, NULL, 1, '2022-10-19 13:52:39', 3),
(4, 1, '4', 'Fourth ward', 2, 7, NULL, 1, '2022-10-19 13:55:59', 3),
(5, 1, '5', 'Fifth Ward', 2, 7, NULL, 1, '2022-10-19 14:12:14', 3),
(6, 5, '1', 'ward 1', 2, 3, NULL, 1, '2022-10-19 14:30:35', 3);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(30) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_by`, `created_on`) VALUES
(1, 'Admin', 1, '2021-08-31 11:30:56'),
(2, 'Supervisor', 1, '2021-08-31 11:31:06'),
(3, 'Customers', 1, '2021-08-31 11:31:06'),
(6, 'Project Head', 3, '2022-10-19 14:35:46'),
(5, 'Regional Officer', 1, '2022-10-19 09:39:16');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`state_id`, `state_name`, `user_id`, `status`) VALUES
(2, 'Telangana', 3, 1),
(3, 'Andhra Pradesh', 3, 1),
(4, 'Karnataka', 3, 1),
(5, 'Orissa', 1, 1),
(6, 'Tamil Nadu', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `sub_category_id` int(11) NOT NULL,
  `sub_category_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `customer_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`sub_category_id`, `sub_category_name`, `category_id`, `customer_type_id`, `user_id`, `status`) VALUES
(1, 'Diagnostics', 5, 3, 3, 1),
(2, 'Clinic', 5, 3, 3, 1),
(3, 'Super Speciality', 5, 3, 3, 1),
(4, 'Saloon', 6, 3, 3, 1),
(5, 'Hardware Store', 6, 3, 3, 1),
(6, 'Eat Out', 7, 3, 3, 1),
(7, '3 Star Hotel', 7, 3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` tinyint(2) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `mobile`, `role_id`, `remember_token`, `updated_at`) VALUES
(1, 'super', 'superadmincubebio@gmail.com', 'superadmincubebio@gmail.com', '$2y$10$jECXp6rSnVzdOUsK78crYudgkDxJr/0eajbxYo0G5cC68KbDXm2oK', '8532147002', 1, '1666160916', '2022-10-19 06:28:36'),
(2, 'supervisor', 'supervisorcubebio@gmail.com', 'supervisorcubebio@gmail.com', '$2y$10$k.U/srsF5kDjIAF77ZKg2.pDIb1JY1I/3BnX1CGsWVkCTWnjS9Gpe', '6546456754', 2, '1665493804', '2022-10-20 11:57:34'),
(3, 'kiran', 'admin', 'admin', '$2a$12$LbpQB5INazJZ8Dv9qyvEeu5CH6gQcPGTfDvqMuUVJw0MyoPPoNS2y', '9966911011', 1, '1665571563', '2022-10-25 07:12:01'),
(5, 'secondcustomer', 'customer2@gmail.com', 'customer2@gmail.com', NULL, '9876543210', 3, NULL, '2022-10-21 07:11:49'),
(6, 'super', 'supervisor@gmail.com', 'supervisor@gmail.com', NULL, '8532147005', 2, NULL, '2022-10-15 11:57:36'),
(9, 'ashok', 'ashokalluri@gmail.com', 'ashokalluri@gmail.com', '$2a$12$Nenssb83ivQp1yfuHeRZo.Lzi0osOk4pLCqqMiVPIgHeg1lo8Bh8q', '7799911011', 2, '1666101372', '2022-10-25 08:48:26'),
(10, 'rajesh', 'rajesh@dsf.com', 'rajesh@dsf.com', NULL, '3425243524', 2, NULL, '2022-10-20 08:11:02'),
(13, 'ashok alluri', 'efdsaf@fdasfa.com', 'efdsaf@fdasfa.com', NULL, '5243524352', 3, NULL, '2022-10-20 13:54:15'),
(14, 'ashok', 'faasd@dsa.com', 'faasd@dsa.com', NULL, '9966911011', 3, NULL, '2022-10-25 07:19:24'),
(16, 'sharath', 'sharath@gmail.com', 'sharath@gmail.com', NULL, '7766776677', 3, NULL, '2022-10-31 11:48:33');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `role_id` int(11) NOT NULL COMMENT '1=>admin,2=>supervisor,3=>customers',
  `created_by` int(11) NOT NULL,
  `supervisor_id` int(11) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `house_no` varchar(255) DEFAULT NULL,
  `state_id` varchar(60) DEFAULT NULL,
  `city_id` varchar(60) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `project_ward_id` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `locality` varchar(60) DEFAULT NULL,
  `postalcode` varchar(20) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `customer_type` varchar(100) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `role_id`, `created_by`, `supervisor_id`, `name`, `email`, `mobile`, `house_no`, `state_id`, `city_id`, `project_id`, `project_ward_id`, `address`, `locality`, `postalcode`, `unit`, `customer_type`, `category_id`, `sub_category_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, NULL, 'super', 'superadmincubebio@gmail.com', '8532147002', '', '1', '1', 3, '1', 'main road', 'near bustop', '500032', '2', '2', 1, 1, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(2, 2, 2, 3, NULL, 'supervisor', 'supervisorcubebio@gmail.com', '6546456754', '', '2', '3', 5, '6', 'main road1', 'gachibowli', '500084', NULL, NULL, NULL, NULL, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(3, 3, 1, 1, 6, 'admin', 'admin', '9876543210', '3-124-1/456', '3', '6', 0, '', 'main road', 'near bustop', '500032', '', '3', 5, 2, '2022-10-11 12:56:02', '2022-10-11 12:56:02'),
(4, 5, 3, 2, 2, 'customer3', 'customer3@gmail.com', '8532147001', '457df324', '2', '3', 3, '1', 'main road', 'near bustop', '500032', '1', '3', 5, 1, '2022-10-13 10:05:15', '2022-10-13 10:05:15'),
(5, 6, 2, 3, NULL, 'super', 'supervisor@gmail.com', '8532147005', NULL, '2', '3', 1, '1', 'main road', 'near bustop', '500032', NULL, NULL, NULL, NULL, '2022-10-15 11:57:36', '2022-10-15 11:57:36'),
(8, 5, 3, 2, 2, 'customer3', 'customer3@gmail.com', '9876543210', '3-124-1/456', '2', '3', 3, '2', 'main road', 'near bustop', '500032', '1', '3', 5, 2, '2022-10-13 10:05:15', '2022-10-13 10:05:15'),
(9, 9, 2, 3, NULL, 'ashok', 'ashokalluri@gmail.com', '2435243544', NULL, '2', '3', 1, '5', 'dsafasds', 'fdasfdsa', '342342', NULL, NULL, NULL, NULL, '2022-10-20 08:57:14', '2022-10-20 08:57:14'),
(10, 10, 2, 3, NULL, 'rajesh', 'rajesh@dsf.com', '4312413232', NULL, '2', '3', 1, '3', 'dasdAS', 'FDSAFASD', '324213', NULL, NULL, NULL, NULL, '2022-10-20 11:42:39', '2022-10-20 11:42:39'),
(11, 5, 3, 3, 6, 'customer3', 'customer3@gmail.com', '4352943952', '3-124-1/456', '3', '6', 1, '2', 'main road', 'near bustop', '500032', '1', '4', 8, NULL, '2022-10-20 13:59:22', '2022-10-20 13:59:22'),
(12, 13, 3, 9, 9, 'kiran', 'ashokalluri@gmail.com', '9966911011', '165', '2', '3', 1, '4', 'Bachupally', 'Bachupally', '500090', '1', '4', 9, NULL, '2022-10-21 09:40:14', '2022-10-21 09:40:14'),
(13, 13, 3, 9, 9, 'customer5', 'customer5@gmail.com', '7799911011', '167', '2', '3', 1, '4', 'Bachupally', 'bachupally', '500091', '1', '3', 5, 2, '2022-10-21 09:43:21', '2022-10-21 09:43:21'),
(14, 14, 3, 3, 9, 'ashok', 'faasd@dsa.com', '9966911011', '158', '2', '3', 1, '5', 'zcxvzxc', 'vzcxvzx', '500090', '1', '4', 8, NULL, '2022-10-21 11:20:49', '2022-10-21 11:20:49'),
(15, 16, 3, 3, 10, 'sharath', 'sharath@gmail.com', '7766776677', 'eqrwrqwe', '2', '3', 1, '3', 'rqwerqwe', 'rwqerqwe', '543425', '1', '4', 8, NULL, '2022-10-31 11:48:33', '2022-10-31 11:48:33');

-- --------------------------------------------------------

--
-- Table structure for table `wards`
--

CREATE TABLE `wards` (
  `ward_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `ward_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ward_locality` varchar(255) NOT NULL,
  `ward_address` varchar(255) NOT NULL,
  `ward_pincode` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wards`
--

INSERT INTO `wards` (`ward_id`, `state_id`, `city_id`, `ward_name`, `user_id`, `ward_locality`, `ward_address`, `ward_pincode`, `contact_number`, `status`) VALUES
(2, 2, 3, 'Ward-1', 3, '', '', '', '', 1),
(3, 2, 3, 'Ward-2', 3, '', '', '', '', 1),
(4, 2, 7, 'ward-1', 1, 'service road', 'opposite shopping malla', '500082', '9874563211', 1),
(5, 2, 7, '10', 1, 'side lane', 'opposite busstand', '500142', '9874563210', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billings`
--
ALTER TABLE `billings`
  ADD PRIMARY KEY (`billing_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`charges_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `customer_types`
--
ALTER TABLE `customer_types`
  ADD PRIMARY KEY (`customer_type_id`);

--
-- Indexes for table `dummy`
--
ALTER TABLE `dummy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `project_types`
--
ALTER TABLE `project_types`
  ADD PRIMARY KEY (`project_type_id`);

--
-- Indexes for table `project_wards`
--
ALTER TABLE `project_wards`
  ADD PRIMARY KEY (`project_ward_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`sub_category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wards`
--
ALTER TABLE `wards`
  ADD PRIMARY KEY (`ward_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billings`
--
ALTER TABLE `billings`
  MODIFY `billing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `charges_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer_types`
--
ALTER TABLE `customer_types`
  MODIFY `customer_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dummy`
--
ALTER TABLE `dummy`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `project_types`
--
ALTER TABLE `project_types`
  MODIFY `project_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `project_wards`
--
ALTER TABLE `project_wards`
  MODIFY `project_ward_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `wards`
--
ALTER TABLE `wards`
  MODIFY `ward_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
