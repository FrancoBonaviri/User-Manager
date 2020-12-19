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
    
    private domicilioService = new DomicilioService();

    // Attributes -> 
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    FechaNacimiento: Date;
    Telefono: string;

    Domicilio: Domicilio;

    constructor (
        obj: any,
    ) 
    {
        this.id = obj.id;
        this.nombre = obj.nombre;
        this.apellido = obj.apellido;
        this.email = obj.email;
        this.FechaNacimiento = obj.FechaNacimiento;
        this.Telefono = obj.Telefono;
        this.Domicilio = new Domicilio( {} );
        if( obj.DomicilioId ){
            this.domicilioService.getById( obj.DomicilioId ).then( (res: Domicilio ) => {
                this.Domicilio = res;
            });
        } 
 
    }

}



export default Usuario;