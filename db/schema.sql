CREATE DATABASE test_db;

USE test_db;

CREATE TABLE `user` (
	id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    active boolean,
    date timestamp,
    PRIMARY KEY (id)
)