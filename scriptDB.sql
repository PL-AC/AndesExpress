create database dbAndesExpress;
go
use dbAndesExpress;
go
create table Customer(
idCustomer INT PRIMARY KEY IDENTITY(1,1),
fullName VARCHAR(250),
phone	VARCHAR(9),
email VARCHAR(50)
);
go
create table Car(
idCar INT PRIMARY KEY IDENTITY(1,1),
idCustomer INT,
brand varchar(50),
model varchar(50),
plate varchar(8),
status INT default 1,
CONSTRAINT fk_carCustomer
FOREIGN KEY (idCustomer)
REFERENCES Customer(idCustomer)
);
go
create table ParkingLot(
idParkingLot INT PRIMARY KEY IDENTITY(1,1),
description VARCHAR(250),
places INT
);
go
INSERT INTO ParkingLot (description, places) VALUES
('Estacionamiento Piso 1', 35),
('Estacionamiento Piso 2', 55);
go
create table Parking(
idParking INT PRIMARY KEY IDENTITY(1,1),
idParkingLot INT,
idCar INT,
entryDate DateTime,
departureDate DateTime NULL,
status INT,
CONSTRAINT fk_ParkingLot
FOREIGN KEY (idParkingLot)
REFERENCES ParkingLot(idParkingLot),
CONSTRAINT fk_carParking
FOREIGN KEY (idCar)
REFERENCES Car(idCar)
);
go
create table Users(
idUser INT PRIMARY KEY IDENTITY(1,1),
username VARCHAR(20),
password VARCHAR(20)
);
go
INSERT INTO Users (username, password) VALUES
('paranda', 'paranda');
go

/* Stored procedure Customer */
create procedure sp_GetAllCustomer
as
select * from Customer
go

create procedure sp_InsertCustomer
@fullName VARCHAR(250),
@phone	VARCHAR(9),
@email VARCHAR(50)
as
INSERT INTO Customer values(@fullName,@phone,@email)
go

create procedure sp_UpdateCustomer
@idCustomer INT,
@fullName VARCHAR(250),
@phone	VARCHAR(9),
@email VARCHAR(50)
as
update Customer set fullName=@fullName, phone=@phone, email=@email
where idCustomer=@idCustomer
go

create procedure sp_DeleteCustomer
@idCustomer INT
as
delete from Customer
where idCustomer=@idCustomer
go
/* Stored procedure Car */
create procedure sp_GetAllCar
as
select * from Car 
inner join Customer on Car.idCustomer=Customer.idCustomer
go

create procedure sp_InsertCar
@idCustomer INT,
@brand varchar(50),
@model varchar(50),
@plate varchar(8)
as
INSERT INTO Car (idCustomer,brand,model,plate) values(@idCustomer,@brand,@model,@plate)
go

create procedure sp_UpdateCar
@idCar INT,
@idCustomer INT,
@brand varchar(50),
@model varchar(50),
@plate varchar(8)
as
update Car set idCustomer=@idCustomer, brand=@brand, model=@model, plate=@plate
where idCar=@idCar
go

create procedure sp_DeleteCar
@idCar INT
as
delete from Car
where idCar=@idCar
go

create procedure sp_GetCarByPlate
@plate varchar(8)
as
SELECT * FROM Car c INNER JOIN Customer cu ON c.idCustomer=cu.idCustomer
WHERE c.plate= @plate AND c.status=1
go

/* Stored procedure User */
create procedure sp_GetAllUser
as
select * from Users
go

create procedure sp_InsertUser
@username VARCHAR(20),
@password	VARCHAR(20)
as
INSERT INTO Users values(@username,@password)
go

create procedure sp_GetUserLogin
@username VARCHAR(20),
@password	VARCHAR(20)
as
select * from Users
where username=@username and
password=@password
go

/* Stored procedure Parking */
create procedure sp_GetAllParking
as
SELECT pl.idParkingLot, pl.description, pl.places, COUNT(p.idParking) AS occupiedPlaces,
(pl.places - COUNT(p.idParking)) AS remainingPlaces
FROM ParkingLot pl
LEFT JOIN Parking p ON pl.idParkingLot = p.idParkingLot AND p.status = 1
GROUP BY pl.idParkingLot, pl.description, pl.places
go

create procedure sp_GetAllParkingByLot
@idParkingLot INT
as
SELECT pl.idParkingLot, pl.description, c.idCar, c.brand, c.model, c.plate, p.entryDate
FROM ParkingLot pl 
JOIN Parking p ON pl.idParkingLot = p.idParkingLot
JOIN Car c ON p.idCar = c.idCar
WHERE pl.idParkingLot = @idParkingLot and p.status = 1
go

create procedure sp_InsertParking
@idParkingLot INT,
@idCar INT
as
INSERT INTO Parking (idParkingLot,idCar,entryDate,status)
values(@idParkingLot,@idCar,GETDATE(),1)
UPDATE Car SET status=0 WHERE idCar=@idCar
go

create procedure sp_DeleteCarParking
@idCar INT
as
DELETE FROM Parking WHERE idCar=@idCar
UPDATE Car SET status=1 WHERE idCar=@idCar
go
