/*
    This is the user routes file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
    ROUTE = /user
*/


// imports ===========================================================================
import { Router } from "express";
import UserController from '../controllers/userController';

// controllers ->
let usersController = new UserController();

// middlewares ->
import { check } from 'express-validator';
import bodyValidate from "../middlewares/bodyValidate";

// create the router ->
const userRoutes = Router();


userRoutes.post('/', [
    check('nombre', 'Name is required').not().isEmpty(),
    check('apellido', 'apellido is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email').isEmail(),
    bodyValidate,
], usersController.createUser ) // Create user

userRoutes.get('/', usersController.getUsers ); // Get all users

userRoutes.get('/:id', usersController.getUserById ); // Get user by id



export default userRoutes;

