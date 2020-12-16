/*
This is the user service class (CRUD)
author: Franco Bonaviri | francobonaviri@hotmail.com
Created: 15/12/2020
Last update: 15/12/2020
*/

// imports ->
import SqlConnection from '../Database/Base';
import Usuario from '../models/usuario';
import bcrypt from 'bcrypt'; 

class UserService {

    constructor(
        private db: SqlConnection
    )
    {}


    // Create a user 
    insert = async(user: Usuario, password: string) => {

        // Create the query ->
        let query = 'INSERT into usuario (email, ClaveHash, nombre, apellido, FechaNacimiento, Telefono)'
        + 'VALUES (?, ?, ?, ?, ?, ?)';

        
        // Encrypt the password ->
        let salt = await bcrypt.genSaltSync(10)
        let passHash = await bcrypt.hashSync(password, salt);

        // Create the params ->
        let params = [ user.email, passHash, user.nombre, user.apellido, user.FechaNacimiento , user.Telefono ];

        //Save data ->
        this.db.executeQuery(query, params, ( res: any ) => {
            if( res ){
                return res;
            }
        }, ( err: any ) => {
            throw new Error( err );
            console.log(err);
        })

        
    }

}

// Eliminar _____________________________________________________
let service = new UserService( new SqlConnection() );

let user = new Usuario(0, 'franco', 'Bonaviri', 'francobonaviri@hotmail.com', new Date(), ''); 

service.insert(user, '123');
//  ______________________________________________________

export default UserService;