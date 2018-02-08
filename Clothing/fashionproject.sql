drop database if exists fashionproject;
create database fashionproject;
use fashionproject;

create table clothingarticle(
    id int not null auto_increment,
    item varchar(50),
    name varchar(50) not null,
    quantity int,
    avgprice float,
    salesmargin float,
    budget float,
    primary key (id)
);

create table users(
    id int not null auto_increment,
    FirstName varchar(50)not null,
    LastName varchar(50) not null,
    username varchar(50),
    password varchar(50),
    primary key (id)
);


insert into clothingarticle values(default,"shirt","redshirt",2,3,0.5,200);

insert into users values(default,"Whiteboard","Marker","admin","admin");

select * from clothingarticle;

select * from users;


--source C:/fashion/Clothing/fashionproject.sql