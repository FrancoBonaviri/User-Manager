/*
    This class models a user permission
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 15/12/2020
    Last update: 15/12/2020
*/

class Permiso {

    id: number;
    Codigo: string;
    Descripcion: string;
    EnUso: boolean;


    constructor(
        _id: number,
        _Codigo: string,
        _Descripcion: string,
        _EnUso: boolean
    ) 
    {
        this.id = _id;
        this.Codigo = _Codigo;
        this.Descripcion = _Descripcion;
        this.EnUso = _EnUso; 
    }
}

export default Permiso;