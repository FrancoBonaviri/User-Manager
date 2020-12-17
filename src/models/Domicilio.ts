/*
    This class models an address of an application user
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 16/12/2020
    Last update: 16/12/2020
*/

class Domicilio {

    // Attributes ->
    id: number;
    numero: number;
    CodigoPostal: string;
    CalleA: string;
    CalleB: string;
    CalleC: string;
    Pais: string;
    Ciudad: string;


    constructor(
       obj: any
    ) 
    {
        this.id = obj.id;
        this.numero = obj.numero;
        this.CodigoPostal = obj.CodigoPostal;
        this.CalleA = obj.CalleA;
        this.CalleB = obj.CalleB;
        this.CalleC = obj.CalleC;
        this.Pais = obj.Pais;
        this.Ciudad = obj.Ciudad;
    }

}

export default Domicilio;