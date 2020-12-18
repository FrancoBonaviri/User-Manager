/*
    This class models a user of the application
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/

// imports ->
import Domicilio from './Domicilio';
import DomicilioService from '../services/domicilioService';





class Usuario {

    // Attributes -> 
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    FechaNacimiento: Date;
    Telefono: string;

    Domicilio: Domicilio;

    constructor(
        obj: any,
        private domicilioService: DomicilioService
    ) 
    {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.apellido = obj.apellido;
        this.email = obj.email;
        this.FechaNacimiento = obj.FechaNacimiento;
        this.Telefono = obj.Telefono;
        if( obj.DomicilioId ){
            this.Domicilio = this.domicilioService.getById( obj.DomicilioId );
        }
        else{
            this.Domicilio = new Domicilio( {} );
        }
    }
}



export default Usuario;