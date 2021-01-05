/*
    This is the user service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 19/12/2020
    Last update: 19/12/2020
*/

// imports ->
import SqlConnection from '../Database/Base';
import Usuario from '../models/usuario';
import bcrypt from 'bcrypt'; 
import usuario from '../interfaces/usuario';
import DomicilioService from './domicilioService';

class UserService {

    private db: SqlConnection = new SqlConnection();
    private domicilioService = new DomicilioService();

    // Create a user 
    insert = (user: Usuario, password: string) => {

        return new Promise( async( resolve, reject ) => {

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
                    resolve( res.insertId );
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            })        
        });

    }



    // Get all users ->
    getAll = () => {
        return new Promise<Usuario[]>( ( resolve , reject ) => {
            // create the query ->
            let query = 'SELECT *from usuario WHERE FechaBaja is null';
    
            // Execute query ->
            this.db.executeQuery(query, [] , ( res: any ) => {
                if( res?.length > 0 ){
                    this.fillList( res );
                    resolve(res);
                }
                else {
                    resolve([]);
                }
            }, ( err: any ) => {
                console.log( err )
                reject( err );
            })
        });
    }



    // get user by id
    getById = ( id: number ) => {
        return new Promise<any>( ( resolve , reject ) => {

            // Create query ->
            let query = 'SELECT *from usuario where id = ? and FechaBaja is null';
    
            // Params ->
            let params = [id];
    
            // execute query ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res?.length > 0 ){
                    this.fill( res[0] );
                    resolve( res[0] );
                }
                else {
                    resolve ( null );
                }
            }, ( err: any) => {
                console.log( err );
                reject( err );
            });

        });

    }

    // get user by id
    getByEmail = ( email: string ) => {
        return new Promise<any>( ( resolve , reject ) => {

            // Create query ->
            let query = 'SELECT *from usuario where email = ? and FechaBaja is null';
    
            // Params ->
            let params = [email];
    
            // execute query ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res?.length > 0 ){
                    this.fill( res[ 0 ] );
                    resolve( res[0] );
                }
                else {
                    resolve( null )
                }
            }, ( err: any) => {
                console.log( err );
                reject( err );
            });

        });

    }


    // dar de baja by id
    bajaById = ( id: number ) => {

        return new Promise( ( resolve , reject ) => {

            // create the query ->
            let query = 'Update usuario set FechaBaja = NOW() WHERE id = ?';
    
            // Params ->
            let params  = [id];
    
            // execute the query ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res ){
                    resolve( res );
                }
            }, ( err: any ) => {
                console.log( err );
                reject( err );
            });
        });
    }

    //Existe user ->
    existUser = ( id: number ): any => {
        
        return new Promise<boolean>( ( resolve , reject ) => {

            // create the query ->
            let query = 'Select * from usuario WHERE id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                // Si encuentra algo retorno true ->
                if( res.length > 0 ){
                    return resolve( true );
                }
                resolve( false );
            }, ( err: any ) => {
                reject( err );
            });

        });


    }

    updateUser = ( userId: number, user: usuario ):Promise<any> => {
        return new Promise<any>( async( resolve, reject ) => {

            // Valido que el usuario existe ->
            if( ! await this.existUser( userId )){
                reject('El usuario no existe');
            }

            // creo que query ->
            let query = 'Update usuario set ';
            
            // Params ->
            let params = '';

            if( user.Telefono.trim() !== "" ) {params += `Telefono = ${ user.Telefono }, `}
            if( user.nombre.trim() !== "" ) {params += `nombre = ${ user.nombre }, `}
            if( user.apellido.trim() !== "" ) {params += `apellido = ${ user.apellido }, `}
            if( user.Telefono.trim() !== "" ) {params += `Telefono = ${ user.Telefono }, `}
            if( user.FechaNacimiento  ) {params += `FechaNacimiento = ${ user.FechaNacimiento }, `}

            // Si se actualizo algun campo ->
            if(params != ''){

                // Completo el query ->
                let stringQuery = query + params + 'WHERE id = ?';

                // ejecuto el query ->
                this.db.executeQuery(stringQuery, [userId], ( res: any ) => {
                    if( res ){
                        resolve( res );
                    }
                }, ( err: any ) => {
                    console.log( err );
                    reject( err );
                });
            } else {
                resolve( user );
            }

        });
    }


    updateDomicilioUser = ( userId: number, domicilioId: number ) => {
        return new Promise<any> ( async( resolve, reject ) => {

            // Valido que el usuario existe ->
            if( ! await this.existUser( userId )){
                reject('El usuario no existe');
            }

            // valido que el domicilio exista ->
            if( !await this.domicilioService.existDomicilio( domicilioId ) ){
                reject('El domicilio no existe');
            }

            // Actualizo el usuario ----------

            // create the query ->
            let query = 'UPDATE usuario set DomicilioId = ? WHERE id = ?';
            
            // Params ->
            let params = [ domicilioId, userId ];

            // Ejecto ->
            this.db.executeQuery( query, params, ( res: any ) => {

                if( res ){
                    resolve( res ); 
                }

            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });
    }


    private fill = ( obj: any) => {
        delete obj.ClaveHash; 
        delete obj.FechaRegistro;
        delete obj.FechaBaja;
    }

    private fillList = ( obj: any[] ) => {
        obj.forEach( item => {
            delete item.ClaveHash; 
            delete item.FechaRegistro;
            delete item.FechaBaja;
        });
    }

}

export default UserService;