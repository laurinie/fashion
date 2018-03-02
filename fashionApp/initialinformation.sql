INSERT INTO fashion2.collection (name) VALUES ("Spring 2018"), ("Summer 2018"), ("Metropolia healthcare"), ("Junction");

INSERT INTO fashion2.category (name, budget) VALUES ("Shirts", 7000), ("Jackets", 10000), ("Pants", 9000), ("Dresses", 5000);

INSERT INTO fashion2.type (name, budget) 
VALUES ("T-shirts", NULL), ("Tops", NULL), ("Jeans", NULL), ("Shorts", NULL);


INSERT INTO fashion2.productcard (name, type, category, color, totalqty, price, wholesaleprice, retailprice) 
VALUES ("Rock 'n' roll", 1, 1, "black", 10, 5.0, 15.0, 20.0), ("Flower girl", 1, 1, "pink", 17, 7.0, 300.0, 23.0), ("Sport style crop top", 1, 1, "black", 17, 7.0, 300.0, 23.0), ("Boyfriend jeans", 4, 3, "blue", 17, 7.0, 300.0, 23.0), ("Dotted summer shorts", 4, 3, "black", 17, 7.0, 300.0, 23.0);

