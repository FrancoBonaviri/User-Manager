/*
    This class models a user of the application
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 15/12/2020
    Last update: 15/12/2020
*/

// imports ->
import Domicilio from "./Domicilio";





class Usuario {

    // Attributes -> 
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    FechaNacimiento: Date;
    Telefono: string;

    Domicilio: Domicilio[] = [];

    constructor(
        _id: number, 
        _nombre: string,
        _apellido: string,
        _email: string,
        _FechaNacimiento: Date,
        _Telefono: string
    ) 
    {
        this.id = _id;
        this.nombre = _nombre;
        this.apellido = _apellido;
        this.email = _email;
        this.FechaNacimiento = _FechaNacimiento;
        this.Telefono = _Telefono;
        console.log('TODO Falta implementar el domicilio de los usuarios ("DomicilioService.LoadByUserId") ');
    }
}



export default Usuario;