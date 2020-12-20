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

//  Create the router ->
const router = Router();


// user routes ->
router.use('/user', userRoutes );

router.use('/adress', adressRoutes );


export default router;