INSERT INTO fashion2.collections (name, budget) 
	VALUES ("Spring 2018", 20000.0);
INSERT INTO fashion2.collections (name, budget) 
	VALUES ("Summer 2018", 10000.0);
INSERT INTO fashion2.collections (name, budget) 
	VALUES ("Metropolia healthcare", 150000.0);
INSERT INTO fashion2.collections (name, budget) 
	VALUES ("Junction", 70000.0);


INSERT INTO fashion2.categoryname (name) 
	VALUES ("Jackets");
INSERT INTO fashion2.categoryname (name) 
	VALUES ("Pants");
INSERT INTO fashion2.categoryname (name) 
	VALUES ("Dresses");
INSERT INTO fashion2.categoryname (name) 
	VALUES ("Headwear");
INSERT INTO fashion2.categoryname (name) 
	VALUES ("Bags");


INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (1, 7000.0, 1);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (2, 10000.0, 1);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (3, 9000.0, 1);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (4, 5000.0, 1);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (1, NULL, 2);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (1, NULL, 3);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (3, NULL, 3);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (2, NULL, 3);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (1, NULL, 3);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (5, NULL, 4);
INSERT INTO fashion2.category (name, budget, collectionID) 
	VALUES (6, NULL, 4);


INSERT INTO fashion2.typename (name) 
	VALUES ("T-Shirts");
INSERT INTO fashion2.typename (name) 
	VALUES ("Tops");
INSERT INTO fashion2.typename (name) 
	VALUES ("Longsleeved");
INSERT INTO fashion2.typename (name) 
	VALUES ("Jeans");
INSERT INTO fashion2.typename (name) 
	VALUES ("Shorts");
INSERT INTO fashion2.typename (name) 
	VALUES ("Leggings");
INSERT INTO fashion2.typename (name) 
	VALUES ("Leather jacket");
INSERT INTO fashion2.typename (name) 
	VALUES ("Rain jacket");
INSERT INTO fashion2.typename (name) 
	VALUES ("Beanie");
INSERT INTO fashion2.typename (name) 
	VALUES ("Clutch");

INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (1, NULL, 6);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (2, NULL, 9);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (2, NULL, 5);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (3, NULL, 12);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (4, NULL, 2);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (4, NULL, 13);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (5, NULL, 14);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (6, NULL, 3);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (7, NULL, 2);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (7, NULL, 2);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (8, NULL, 11);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (9, NULL, 10);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (10, NULL, 15);
INSERT INTO fashion2.type (name, budget, categoryID) 
	VALUES (1, NULL, 1);



INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Rock n roll", 1, 1, "black", 10, 5.0, 15.0, 20.0);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Flower girl", 1, 1, "pink", 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Sport style crop top", 1, 1, "black", 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Boyfriend jeans", 4, 3, "blue", 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Dotted summer shorts", 4, 3, "black", 17, 7.0, 300.0, 23.0);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("t-shirt ", 2, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("longsleeved shirt", 3, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Ripped jeans", 4, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Skinny jeans", 4, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Jean shorts, ripped edged", 5, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Leopard leggings", 6, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Rad leather jacket", 7, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Decorated leather jacket", 7, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Finnish rain jacket", 8, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Junction merch beanie", 9, 5, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Summer festival clutch", 10, 6, NULL, NULL, NULL, NULL, NULL);
INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
	VALUES ("Simple t-shirt for nurses", 1, 1, NULL, NULL, NULL, NULL, NULL);
