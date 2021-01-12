/*
    This is the permisos routes file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 05/01/2021
    Last update: 05/01/2021
    ROUTE = /permiso 
*/


// imports ===========================================================================
import { Router } from "express";

// middlewares ->
import { check } from 'express-validator';
import bodyValidate from '../middlewares/bodyValidate';


//Controller ->
import PermisoController from '../controllers/permisosController';
const permisoController = new PermisoController;



const permisosRoutes = Router();



permisosRoutes.post('/', [
    check('Codigo', "El codigo es requerido").not().isEmpty(),
    check("Descripcion", 'La descripcion es requerida').not().isEmpty(),
    bodyValidate
],permisoController.insert );



permisosRoutes.post('/AddToUser/', [
    check("idUser", 'El id del usuario es requerido'),
    check('idPermiso', 'El id del permiso es requerido'),
    bodyValidate
], permisoController.addToUser );


permisosRoutes.post('/removeFromUser/', [
    check("idUser", 'El id del usuario es requerido'),
    check('idPermiso', 'El id del permiso es requerido'),
    bodyValidate
] ,permisoController.deleteToUser );

permisosRoutes.delete('/:id', permisoController.deletePermiso );

export default permisosRoutes;