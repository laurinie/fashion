/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Bulle
 * Created: Mar 1, 2018
 */

INSERT INTO fashion2.collection (`name`) 
	VALUES ('Spring 2018')
INSERT INTO fashion2.collection (`name`) 
	VALUES ('Summer 2018')
INSERT INTO fashion2.collection (`name`) 
	VALUES ('Metropolia healthcare')
INSERT INTO fashion2.collection (`name`) 
	VALUES ('Junction')

insert into fashion2.category (name, budget) VALUES ("Shirts", 7000);
insert into fashion2.category (name, budget) VALUES ("Jackets", 10000);
insert into fashion2.category (name, budget) VALUES ("Pants", 9000);
insert into fashion2.category (name, budget) VALUES ("Dresses", 5000);


INSERT INTO fashion2.`type` (`name`, budget) 
	VALUES ('Jeans', NULL);
INSERT INTO fashion2.`type` (`name`, budget) 
	VALUES ('Shorts', NULL);


INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES (`Rock ''n'' roll`, 1, 1, 'black', 10, 5.0, 15.0, 20.0);
INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ('Flower girl', 1, 1, 'pink', 17, 7.0, 300.0, 23.0);

