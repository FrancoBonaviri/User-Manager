/*
    This is the adress controller file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 05/01/2021
    Last update: 05/01/2021
*/

import Permiso from "../models/Permiso";
import PermisoService from "../services/permisoService";
import { Request, Response } from "express";

class PermisoController{


    private permisoService = new PermisoService;


    insert = async( req: Request, res: Response ) => {

        // Obtengo la data ->
        const body = req.body;

        // Creo el obj a insertar ->
        const permiso = new Permiso( body );

        // Guardo el permiso en la DB y obtengo el id-> 
        const id = await this.permisoService.insert( permiso );
        
        return res.json({
            ok: true,
            permiso: {
                ...permiso,
                id
            }
        });
        
    }


    addToUser = async( req: Request, res: Response ) => {

        // Obtengo los id ->
        const { idUser, idPermiso } = req.body;

        // Guardo el registro en la DB ->
        this.permisoService.addPermissionToUser( idUser, idPermiso ).then( data => {

            return res.json({
                ok: true,
                msg: 'El permiso fue agregado al usuario'
            });
        }).catch( err => {
            return res.json({
                ok: false,
                msg: err
            })
        })



    }


    deleteToUser = async( req: Request, res: Response) => {

        // Obtengo los id ->
        const { idUser, idPermiso } = req.body;

        // Elimino el permiso del usuario ->
        this.permisoService.deletePermisoFromUser(idUser, idPermiso).then( () => {
            return res.json({
                ok: true,
                msg: 'El permiso fue removido del usuario'
            });
        }).catch(err => {
            return res.json({
                ok: false,
                msg: err
            })
        }) 
    }

    deletePermiso = async( req: Request, res: Response) => {

        // obtengo el id ->
        const id = Number(req.params.id);

        // Doy de baja el permiso ->
        this.permisoService.bajaById( id ).then( () => {
            return res.json({
                ok: true,
                msg: 'El permiso fue dado de baja con exito'
            });
        }).catch( err => {
            return res.json({
                ok: false,
                msg: err
            })
        })

    }


}





export default PermisoController;