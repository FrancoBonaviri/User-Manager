/*
    This is the adress routes file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 20/12/2020
    Last update: 20/12/2020
    ROUTE = /adress
*/


// imports ===========================================================================
import { Router } from "express";
import UserController from '../controllers/userController';

// controllers ->
let usersController = new UserController();

// middlewares ->
import { check } from 'express-validator';
import bodyValidate from "../middlewares/bodyValidate";
import AdressController from '../controllers/domicilioController';

// create the router ->
const adressRoutes = Router();

// controllers ->
const addressController = new AdressController();

adressRoutes.get('/', addressController.getAll );


adressRoutes.get('/:id', addressController.getById );



export default adressRoutes;
