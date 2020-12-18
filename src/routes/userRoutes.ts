/*
    This is the user routes file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/


// imports ===========================================================================
import { Router } from "express";
import UserController from '../controllers/userController';

// controllers ->
let usersController = new UserController();

// create the router ->
const userRoutes = Router();

userRoutes.get('/users', usersController.getUsers );




export default userRoutes;

