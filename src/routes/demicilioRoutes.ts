/*
    This is the adress routes file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 31/12/2020
    Last update: 31/12/2020
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



// ROUTES ===============================================================



adressRoutes.get('/', addressController.getAll );


adressRoutes.get('/:id', addressController.getById );


adressRoutes.post('/', [
    check('numero', 'Numero is required').not().isEmpty().isNumeric(),
    check('CalleA', 'CalleA is required').not().isEmpty(),
    check('Ciudad').not().isEmpty().not().isNumeric(),
    check('Pais').not().isEmpty(),
    check('CodigoPostal').not().isEmpty(),
    bodyValidate
], addressController.create );


// END ROUTES ===========================================================

export default adressRoutes;
