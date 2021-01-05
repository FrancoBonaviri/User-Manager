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
import bodyValidate from "../middlewares/bodyValidate";


//Controller ->
import PermisoController from '../controllers/permisosController';
const permisoController = new PermisoController;



const permisosRoutes = Router();



permisosRoutes.post('/', permisoController.insert );



permisosRoutes.post('/AddToUser/', permisoController.addToUser );




export default permisosRoutes;