INSERT INTO fashion2.collection (`name`, budget) 
	VALUES ('Spring 2018', 20000.0);
INSERT INTO fashion2.collection (`name`, budget) 
	VALUES ('Summer 2018', 10000.0);
INSERT INTO fashion2.collection (`name`, budget) 
	VALUES ('Metropolia healthcare', 150000.0);
INSERT INTO fashion2.collection (`name`, budget) 
	VALUES ('Junction', 70000.0);

INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Shirts', 7000.0, 1);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Jackets', 10000.0, 1);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Pants', 9000.0, 1);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Dresses', 5000.0, 1);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Shirts', NULL, 2);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Shirts', NULL, 3);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Pants', NULL, 3);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Jackets', NULL, 3);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Shirts', NULL, 3);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Hats', NULL, 4);
INSERT INTO fashion2.category (`name`, budget, `collectionID`) 
	VALUES ('Bags', NULL, 4);


INSERT INTO fashion2.`type` (`name`, budget, `categoryID`) 
	VALUES ('T-shirts', NULL, NULL);
INSERT INTO fashion2.`type` (`name`, budget, `categoryID`) 
	VALUES ('Tops', NULL, NULL);
INSERT INTO fashion2.`type` (`name`, budget, `categoryID`) 
	VALUES ('Jeans', NULL, NULL);
INSERT INTO fashion2.`type` (`name`, budget, `categoryID`) 
	VALUES ('Shorts', NULL, NULL);


INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ('Rock ''n'' roll', 1, 1, 'black', 10, 5.0, 15.0, 20.0);
INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ('Flower girl', 1, 1, 'pink', 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ('Sport style crop top', 1, 1, 'black', 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ('Boyfriend jeans', 4, 3, 'blue', 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (`name`, `type`, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ('Dotted summer shorts', 4, 3, 'black', 17, 7.0, 300.0, 23.0);

