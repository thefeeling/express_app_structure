DROP TABLE IF EXISTS `board`;
DROP TABLE IF EXISTS `boardcategory`;
DROP TABLE IF EXISTS `user`;


CREATE TABLE IF NOT EXISTS `boardcategory` (
	`board_category`   INTEGER auto_increment , 
	`p_board_category` INTEGER, 
	`board_name`       VARCHAR(25) NOT NULL, 
	`use_yn`           TINYINT(1) NOT NULL, 
	`createdAt`        DATETIME NOT NULL, 
	`updatedAt`        DATETIME NOT NULL, 
	`deletedAt`        DATETIME, PRIMARY KEY (`board_category`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `board` (
	`board_id`       INTEGER auto_increment , 
	`board_category` INTEGER NOT NULL, 
	`board_subject`  VARCHAR(50) NOT NULL, 
	`board_contents` VARCHAR(1500) NOT NULL, 
	`user_id`        INTEGER, `use_yn` TINYINT(1) NOT NULL, 
	`createdAt`      DATETIME NOT NULL, 
	`updatedAt`      DATETIME NOT NULL, 
	`deletedAt`      DATETIME, PRIMARY KEY (`board_id`)
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS `user` (
	`user_id`    INTEGER auto_increment , 
	`email`      VARCHAR(50) NOT NULL UNIQUE, 
	`password`   VARCHAR(96) NOT NULL, 
	`createdAt`  DATETIME NOT NULL, 
	`updatedAt`  DATETIME NOT NULL, 
	`deletedAt`  DATETIME, 
	UNIQUE `user_email_unique` (`email`), 
	PRIMARY KEY (`user_id`)
) ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS `boardComment` (
	`comment_id` INTEGER auto_increment , 
	`board_id` INTEGER, `user_id` INTEGER, 
	`comment_contents` VARCHAR(500) NOT NULL, 
	`use_yn` TINYINT(1) NOT NULL, 
	`createdAt` DATETIME NOT NULL, 
	`updatedAt` DATETIME NOT NULL, 
	`deletedAt` DATETIME, 
	PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB;





SHOW INDEX FROM `user`
SHOW INDEX FROM `boardcategory`
SHOW INDEX FROM `board`
SHOW INDEX FROM `boardComment`
