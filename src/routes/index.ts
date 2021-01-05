/*
    This is the index routes file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/

//  imports ->
import { Router } from "express";
import userRoutes from "./userRoutes";
import adressRoutes from './demicilioRoutes';
import permisosRoutes from "./permisoRoutes";

//  Create the router ->
const router = Router();


// user routes ->
router.use('/user', userRoutes );

router.use('/adress', adressRoutes );

router.use('/permiso', permisosRoutes );


export default router;