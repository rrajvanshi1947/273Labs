-- Create commands
drop database if exists homeapp;

create database homeapp;

use homeapp;

create table Owner(id int AUTO_INCREMENT primary key, name varchar(100) not null, password varchar(100) not null, phone bigint(10), email varchar(100) not null, city varchar(100));

create table Traveller(id int AUTO_INCREMENT primary key, name varchar(100) not null, password varchar(100) not null, phone bigint(10), email varchar(100) not null, city varchar(100));

create table Property(id int AUTO_INCREMENT primary key, name varchar(100) not null, address varchar(500) not null, city varchar(100) not null, zipcode int, areasqft int, persons int, bathrooms int, minstaydays int, ownerid int, foreign key(ownerid) references Owner(id));


-- Insert Commands

INSERT INTO Owner values(1, "Paul Batista", "Paul", 6692644589, "paul.batista@gmail.com", "San Jose");

INSERT INTO Traveller values(1, "Megan Shaw", "Megan", 6692644589, "megan.shaw@gmail.com", "Los Angeles");

insert into Property values(1, "Villa Torino", "28 Bassett Street", "San Jose", 95110, 700, 2, 1, 1, 1);

-- Change table names
rename table Owner to owner;
rename table Traveller to traveller;
rename table Property to property;

-- Alter tables
alter table owner add column username varchar(20), add column address varchar(500), add column zipcode int;
alter table traveller add column username varchar(20), add column address varchar(500), add column zipcode int;
alter table property add column rooms int;

create table property_history(propertyid int, propertyname varchar(100), ownerid int, travellerid int, listdate date, booking_start_date date, booking_end_date date, foreign key(propertyid) references property(id), foreign key(ownerid) references owner(id), foreign key(travellerid) references traveller(id));

alter table traveler change name firstname varchar(100);
update traveler set firstname = 'Megan' where id = '1';
alter table traveler add lastname varchar(100) after firstname, add aboutme varchar(5000);
alter table traveler change email email varchar(150) after lastname;
alter table traveler drop username, drop address, drop zipcode;
alter table traveler change aboutme aboutme varchar(100) after phone, add country varchar(100),add company varchar(100),add school varchar(100),add hometown varchar(100),add languages varchar(100);
update traveler set lastname = 'Shaw', aboutme = 'I love travelling because it opens my mind to new realities' where id = 1;
update traveler set country = 'USA', company = 'Google', school = 'SJSU', hometown = 'San Jose', languages = 'English' where id =1;
alter table traveler add gender varchar(10);
update traveler set gender = 'Female' where id = 1;
alter table owner change name firstname varchar(100), add lastname varchar(100) after firstname, drop username;
alter table property_history change travellerid travelerid int;
 alter table property add minStay int, add startDate date,add endDate date,add currency int;
alter table property modify startDate datetime,modify endDate datetime;


create table trips(id int auto_increment, travelerid int, city varchar(100), country varchar(100), startdate date, enddate date, primary key(id));
insert into trips values(1, 1, 'Miami', 'United States', '2018-03-31', '2018-04-10');
alter table property add meals varchar(100), add houserules varchar(100),add locationtype varchar(100), add theme varchar(100);

alter table property add general varchar(100), add kitchen varchar(100), add dining varchar(100), add entertainment varchar(100), add outside varchar(100), add suitability varchar(100), add attractions varchar(100), add leisureactivities varchar(100), add localservicesbusinesses varchar(100);
alter table property add ownername varchar(100);
alter table property add costperday int;
alter table property modify costperday varchar(100);




