/*
    This class models a user of the application
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 16/12/2020
    Last update: 16/12/2020
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
        obj: any
    ) 
    {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.apellido = obj.apellido;
        this.email = obj.email;
        this.FechaNacimiento = obj.FechaNacimiento;
        this.Telefono = obj.Telefono;
        console.log('TODO Falta implementar el domicilio de los usuarios ("DomicilioService.LoadByUserId") ');
    }
}



export default Usuario;