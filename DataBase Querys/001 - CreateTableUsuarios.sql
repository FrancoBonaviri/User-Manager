CREATE database IF not exists usuariomanager;

use usuariomanager;

CREATE table Usuario (
    id int auto_increment,
    email VARCHAR(100) not null,
    ClaveHash VARCHAR(500) not null,
	nombre VARCHAR(30) not null,
    apellido VARCHAR(30) not null,
    FechaNacimiento DATETIME,
    FechaRegistro DATETIME not null default NOW(),
    FechaBaja DATETIME,
    Telefono VARCHAR(25),
    DomicilioId int,
    PRIMARY KEY (id)
);