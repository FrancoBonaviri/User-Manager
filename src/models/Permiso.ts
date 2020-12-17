/*
    This class models a user permission
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 16/12/2020
    Last update: 16/12/2020
*/

class Permiso {

    id: number;
    Codigo: string;
    Descripcion: string;
    EnUso: boolean;


    constructor(
       obj: any
    ) 
    {
        this.id = obj.Id;
        this.Codigo = obj.Codigo;
        this.Descripcion = obj.Descripcion;
        this.EnUso = obj.EnUso || true; 
    }
}

export default Permiso;