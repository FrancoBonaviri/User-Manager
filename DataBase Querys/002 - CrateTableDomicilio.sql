use usuariomanager


CREATE TABLE Domicilio(
    id int auto_increment,
    Numero int not null,
    CalleA VARCHAR(30),
    CalleB VARCHAR(30),
    CalleC VARCHAR(30),
    Ciudad VARCHAR(50),
    Pais VARCHAR(50),
    CodigoPosta VARCHAR(10),
    PRIMARY KEY (id)
);