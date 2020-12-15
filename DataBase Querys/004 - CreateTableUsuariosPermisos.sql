use usuariomanager


CREATE TABLE UsuariosPermisos(
    id int auto_increment,
    UsuarioId int not null,
    PermisoId int not null,
    PRIMARY KEY (id)
);