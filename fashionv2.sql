drop database if exists fashion2;
create database fashion2;
use fashion2;

create table collection(
    id int auto_increment primary key,
    name varchar(255)
    
);
create table category(
    id int auto_increment primary key,
    name varchar(255),
    budget float
);

create table type(
    id int auto_increment primary key,
    name varchar(255),
    budget float
);

create table productcard(
    id int auto_increment primary key,
    name varchar(255),
    type int,
    category int,
    foreign key (type) references type(id),
    foreign key (category) references category(id),
    color varchar(255),
    totalqty int,
    price float,
    wholesaleprice float,
    retailprice float

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