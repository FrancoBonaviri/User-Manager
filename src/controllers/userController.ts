/*
    This is the user controller file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 11/01/2021
*/

// imports ->
import UserService from "../services/userService";
import { Request, Response } from "express";
import Usuario from '../models/usuario';
import TokenService from '../services/tokenService';


class UserController {

    private userSevice: UserService = new UserService();



    login = async ( req: Request, res: Response ) => {


        // Obtengo el mail y contrañse
        const { email, password } = req.body;

        const token = this.userSevice.login( email, password ).then( token => {

            return res.json({
                ok: true,
                token
            });
        }).catch( err => {
            return res.json({
                ok: false,
                msg: err
            });
        });
        
    }

    isValidToken = async( req: Request, res: Response ) => {
        
        // Obtengo el token ->
        const token = req.params.token;

        // valido el token ->
        const isValidToken = TokenService.comprobarToken( token );

        if( isValidToken != null || isValidToken != undefined ){

            return res.json({
                ok: true,
                isValidToken: true
            });
        }
        else {
            
            return res.json({
                ok: true,
                isValidToken: false
            });
        }
    }


    getUsers = async ( req: Request, res: Response ) => {
        
        // Get the users ->
        const user = await this.userSevice.getAll();

        // return ->
        res.json({
            ok: true,
            user
        });
    }


    getUserById = async ( req: Request, res: Response ) => {

        // Get the id ->
        const id = req.params.id;

        // get the user ->
        const user = await this.userSevice.getById( Number(id) );

        if( !user ){
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            });
        }
        
        return res.json({
            Ok: true,
            user
        });

    }

    getUserByEmail = async ( req: Request, res: Response ) => {

        // Get the id ->
        const email = req.params.email;
        
        // get the user ->
        const user = await this.userSevice.getByEmail( email );

        if( !user ){
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            });
        }
        
        return res.json({
            Ok: true,
            user
        });

    }


    


    createUser = async ( req: Request, res: Response ) => {

        // get the props ->
        const { email, nombre, apellido, FechaNacimiento, Telefono, password } = req.body;

        // Create the user ->
        const user = new Usuario({
            email, 
            nombre, 
            apellido, 
            FechaNacimiento, 
            Telefono
        });

        // Save in DB ->
        await this.userSevice.insert( user, password );
        
        // Obtengo el usuario ->
        var userDb =  await this.userSevice.getByEmail( user.email ) ;

        if( userDb ){
            return res.json({
                ok: true,
                user: userDb
            });
        }
        else {
            return res.status(403).json({
                ok: false,
                message: 'Unknown error, user not created'
            });
        }
    }

    deleteUser = async( req: Request, res: Response ) => {
        
        // get the id ->
        const id = req.params.id;

        // delete the user ->
        await this.userSevice.bajaById( Number(id) );

        return res.json({
            ok: true,
            message: 'User deleted'
        });
    }

    
}



export default UserController;