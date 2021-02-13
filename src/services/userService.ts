/*
    This is the user service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 19/12/2020
    Last update: 13/02/2021
*/

// imports ->
import SqlConnection from '../Database/Base';
import Usuario from '../models/usuario';
import bcrypt from 'bcrypt'; 
import usuario from '../interfaces/usuario';
import DomicilioService from './domicilioService';
import TokenService from './tokenService';

class UserService {

    private db: SqlConnection = new SqlConnection();
    private domicilioService = new DomicilioService();

    // Create a user 
    insert = (user: Usuario, password: string) => {

        return new Promise( async( resolve, reject ) => {

            // Validate that email wasnt register ->
            const dbUser = await this.getByEmail(user.email);
            if( dbUser ) {
                return reject('User already exist')
            }


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
            let query = 'Select COUNT(*) as cantidad from usuario WHERE id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                // Si encuentra algo retorno true ->
                if( res[0]?.cantidad > 0 ){
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

            if( user.Telefono.trim() !== "" ) {params += ` Telefono = '${ user.Telefono }',`}
            if( user.nombre.trim() !== "" ) {params += ` nombre = '${ user.nombre }',`}
            if( user.apellido.trim() !== "" ) {params += ` apellido = '${ user.apellido }',`}
            if( user.FechaNacimiento  ) {params += ` FechaNacimiento = '${ user.FechaNacimiento }',`}
            params = params.substring(0, params.length - 1);

            // Si se actualizo algun campo ->
            if(params != ''){

                // Completo el query ->
                let stringQuery = query + params + ' WHERE id = ?';

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


    login( email: string, password: string ): Promise<string>{
        return new Promise<string>( async(resolve, reject ) => {

            // obtengo el usuario ->
            const usuario = await this.getByEmail( email );

            // Si el usuario existe ->
            if( usuario ){

                // valido la contraseña ->
                if( bcrypt.compareSync( password, usuario.ClaveHash )){
                    
                    // Creo y retorno el token ->
                    const token = TokenService.generateToken( usuario );
                    return resolve(token);
                }

                return reject('Usuario / contraseña incorrecto')


            } else {
                reject('Usuario / contraseña incorrecto');
            }

        })
    }




    private fill = ( obj: any) => {
        // delete obj.ClaveHash; 
        // delete obj.FechaRegistro;
    }

    private fillList = ( obj: any[] ) => {
        obj.forEach( item => {
            // delete item.ClaveHash; 
            // delete item.FechaRegistro;
        });
    }

}

export default UserService;