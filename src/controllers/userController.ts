/*
    This is the user controller file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 13/02/2021
*/

// imports ->
import UserService from "../services/userService";
import { Request, Response } from "express";
import Usuario from '../models/usuario';
import TokenService from '../services/tokenService';
import usuario from "../interfaces/usuario";


class UserController {

    private userSevice: UserService = new UserService();



    login = async ( req: Request, res: Response ) => {


        // Obtengo el mail y contrañse
        const { email, password } = req.body;

        this.userSevice.login( email, password ).then( token => {

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
        const id: any = req.params.id;

        // Valido el id ->
        if ( isNaN( id ) ) {
            return res.json({
                ok: false,
                msg: 'Invalid Id'
            })
        }

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


    updateUser = async( req: Request, res: Response ) => {

        // obtengo el id ->
        const id = req.params.id;

        //Obtengo las props del user ->
        const{ nombre, apellido, email, FechaNacimiento, Telefono } = req.body;

        // creo el usuario ->
        const user: usuario = {
            id: Number(id),
            nombre,
            apellido,
            email,
            FechaNacimiento,
            Telefono,
            DomicilioId: '',
        }

        // lo actualizo ->
        this.userSevice.updateUser(Number(id), user).then( () => {

            return res.json({
                Ok: true,
                user
            });

        }).catch( (err) => {

            return res.status(500).json({
                ok: false,
                message: err
            });
        })

    } 


    updateDomicilioUser = async( req: Request, res: Response ) => {

        // OBtego el id  del usuario ->
        let id: any = req.params.id;


        // Valido el id ->
        if ( isNaN( id ) || isNaN( req.body.DomicilioId ) ) {
            return res.json({
                ok: false,
                msg: 'Invalid Id'
            })
        }

        // Obtengo el id del domicilio ->
        const domicilioId = req.body.DomicilioId;

        // actualizo la prop ->
        this.userSevice.updateDomicilioUser( id, domicilioId ).then( () => {
            return res.json({
                ok: true,
                msg: 'Domicilio actualizado'
            })
        }).catch( err => {
            return res.json({
                ok: false,
                msg: err
            })
        })
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
        try {
            await this.userSevice.insert( user, password );
        } catch (e) {
            return res.json({
                ok: false,
                meg: e
            });
        }
        
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
        const id: any = req.params.id;

        // Valido el id ->
        if ( isNaN( id  ) ) {
            return res.json({
                ok: false,
                msg: 'Invalid Id'
            })
        }

        // delete the user ->
        await this.userSevice.bajaById( Number(id) );

        return res.json({
            ok: true,
            message: 'User deleted'
        });
    }

    
}



export default UserController;