/*
    This is the user service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/

// imports ->
import SqlConnection from '../Database/Base';
import Usuario from '../models/usuario';
import bcrypt from 'bcrypt'; 

class UserService {

    private db: SqlConnection = new SqlConnection();

    // Create a user 
    insert = async(user: Usuario, password: string) => {

        // Create the query ->
        let query = 'INSERT into usuario (email, ClaveHash, nombre, apellido, FechaNacimiento, Telefono)'
        + 'VALUES (?, ?, ?, ?, ?, ?)';

        
        // Encrypt the password ->
        let salt = await bcrypt.genSaltSync(10)
        let passHash = await bcrypt.hashSync(password, salt);

        // Create the params ->
        let params = [ user.email, passHash, user.nombre, user.apellido, user.FechaNacimiento || null, user.Telefono || null ];

        //Save data ->
        this.db.executeQuery(query, params, ( res: any ) => {
            if( res ){
                return res;
            }
        }, ( err: any ) => {
            console.log(err);
            throw new Error( err );
        })        
    }



    // Get all users ->
    getAll = () => {
        return new Promise( ( resolve , reject ) => {
            // create the query ->
            let query = 'SELECT *from usuario WHERE FechaBaja is null';
    
            // Execute query ->
            this.db.executeQuery(query, [] , ( res: any ) => {
                if( res ){
                    resolve(res);
                }
            }, ( err: any ) => {
                console.log( err )
                reject( err );
            })
        });
    }



    // get user by id
    getById = ( id: number ) => {

        // Create query ->
        let query = 'SELECT *from usuario where id = ? and FechaBaja is null';

        // Params ->
        let params = [id];

        // execute query ->
        this.db.executeQuery(query, params, ( res: any ) => {
            if( res ){
                return res;
            }
        }, ( err: any) => {
            console.log( err );
            throw new Error( err );
        });
    }

    // dar de baja by id
    bajaById = ( id: number ) => {

        // create the query ->
        let query = 'Update usuario set FechaBaja = NOW() WHERE id = ?';

        // Params ->
        let params  = [id];

        // execute the query ->
        this.db.executeQuery(query, params, ( res: any) => {
            if( res ){
                return res;
            }
        }, ( err: any ) => {
            console.log( err );
            throw new Error( err );
        });
    }

    //Existe user ->
    existUser = ( id: number ): any => {

        // create the query ->
        let query = 'Select COUNT(*) from usuario WHERE id = ?';

        // Params ->
        let params = [id];

        // Execute query ->
        this.db.executeQuery( query, params, ( res: any ) => {
            // Si encuentra algo retorno true ->
            if( res === 1 ){
                return true;
            }
            return false;
        }, ( err: any ) => {
            console.log( err );
            throw new Error( err );
        });

    }

}

export default UserService;