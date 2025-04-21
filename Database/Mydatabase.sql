CREATE DATABASE nft_marketplace;

USE nft_marketplace;

CREATE TABLE `nft_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `item_description` text,
  `author` varchar(255) DEFAULT NULL,
  `author_wallet` varchar(255) DEFAULT NULL,
  `owner_wallet` varchar(255) DEFAULT NULL,
  `current_bid` decimal(10,6) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'ETH',
  `img_url` varchar(500) DEFAULT NULL,
  `category` text,
  `bidding_end_time` timestamp NULL DEFAULT NULL,
  `author_image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `bid_amount` decimal(18,8) DEFAULT NULL,
  `bid_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `owner_wallet` varchar(255) DEFAULT NULL,
  `author_wallet` varchar(255) DEFAULT NULL,
  `transaction_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `nft_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

