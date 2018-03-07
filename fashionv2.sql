drop database if exists fashion2;
create database fashion2;
use fashion2;





create table collections(
    id int auto_increment primary key,
    name varchar(255),
    budget float    
);

create table categoryname(
    id int auto_increment primary key,
    name varchar(255)
);

create table typename(
    id int auto_increment primary key,
    name varchar(255)
);

create table category(
    id int auto_increment primary key,
    name int,
    budget float,
    collectionID int,
    foreign key (collectionID) references collections(id),
    foreign key (name) references categoryname(id)
);

create table type(
    id int auto_increment primary key,
    name int,
    budget float,
    categoryID int,
    foreign key (categoryID) references category(id),
    foreign key (name) references typename(id)
);

create table color(
    id int auto_increment primary key,
    name varchar(255),
    hexa varchar(255),
    collectionID int,
    foreign key (collectionID) references collections(id)
);

create table productcard(
    id int auto_increment primary key,
    name varchar(255),
    type int,
    category int,
    foreign key (type) references typename(id),
    foreign key (category) references categoryname(id),
    color varchar(255),
    totalqty int,
    price float,
    wholesaleprice float,
    retailprice float

);

create table item(
    id int auto_increment primary key,
    name varchar(255),
    budget float,
    productcardID int,
    foreign key (productcardID) references productcard(id),
    typeID int,
    foreign key (typeID) references type(id)
);













--insert into category values(default,"housut",null),(default,"paidat",null);
--insert into type values(default,"shortsit",null),(default,"tpaita",null);
--insert into item values(default,"fashion shorts",null),(default,"fashion t-paita",null);

--insert into productcard(name,type) values("hienopaita",(select id from type where name = "t-paita"));
--update productcard set pricerange = (select id from pricerange where name = "halpa") where name = "hienopaita";
--update productcard set color = "blue" where name = "hienopaita";
--update productcard set color = "red" where id = last_insert_id();

--insert into productcard(name,type) values("hienohousu",(select id from type where name = "shortsit"));
--update productcard set pricerange = (select id from pricerange where name = "kallis") where id = last_insert_id();



--source C:\fashion\fashionv2.sql