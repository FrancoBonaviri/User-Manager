/*
    This class models an address of an application user
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 15/12/2020
    Last update: 15/12/2020
*/

class Domicilio {

    // Attributes ->
    id: number;
    numero: number;
    CodigoPostar: string;
    CalleA: string;
    CalleB: string;
    CalleC: string;
    Pais: string;
    Ciudad: string;


    constructor(
        _id: number,
        _numero: number,
        _CodigoPosta: string,
        _CalleA: string,
        _CalleB: string,
        _CalleC: string,
        _Pais: string,
        _Ciudad: string
    ) 
    {
        this.id = _id;
        this.numero = _numero;
        this.CodigoPostar = _CodigoPosta;
        this.CalleA = _CalleA;
        this.CalleB = _CalleB;
        this.CalleC = _CalleC;
        this.Pais = _Pais;
        this.Ciudad = _Ciudad;
    }

}

export default Domicilio;