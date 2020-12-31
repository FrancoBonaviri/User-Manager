/*
This is the adress controller file of the server  
author: Franco Bonaviri | francobonaviri@hotmail.com
Created: 31/12/2020
Last update: 31/12/2020
*/

// imports ->
import DomicilioService from '../services/domicilioService';
import { Request, Response } from "express";
import Domicilio from '../models/Domicilio';
import domicilio from '../interfaces/domicilio';

class AdressController {
 
    private domicilioService: DomicilioService = new DomicilioService();


    getAll = async( req: Request, res: Response ) => {

        // Get the domicilios ->
        const adresses = await this.domicilioService.getAll();

        return res.json({
            ok: true,
            addresses: adresses 
        });

    }


    getById = async( req: Request, res: Response ) => {

        const id = req.params.id;

        // Get the adress ->
        const address = await this.domicilioService.getById( Number(id) );

        if( !address ){
            return res.status(404).json({
                ok: false,
                massage: 'Addres not found',
            });
        }


        return res.json({
            ok: true,
            address
        });
    }


    create = async( req: Request, res: Response ) => {

        try {
            
            // Creo el domicilio ->
            const domicilio = new Domicilio( req.body );
    
            // Guardo el domicilio en la base de datos ->
            const data = await this.domicilioService.insert( domicilio );
    
            // return ->
            res.json({
                ok: true,
                data
            });

        } catch (error) {
            res.status(500).json({
                ok: false,
                error,
            });
        } 
    }


}


export default AdressController;