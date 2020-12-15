use usuariomanager


CREATE TABLE Permisos(
    id int auto_increment,
    Codigo VARCHAR(10),
    Descripcion VARCHAR(50),
    EnUso BIT default 1,
    PRIMARY KEY (id)
);