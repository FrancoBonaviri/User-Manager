/*
    This is the permiso service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 19/12/2020
    Last update: 19/12/2020
*/

//  imports 
import SqlConnection from '../Database/Base';
import Permiso from '../models/Permiso';
import UserService from './userService';



class PermisoService {
    private db: SqlConnection = new SqlConnection();
    private userService: UserService = new UserService()

    // insert permiso 
    insert = ( obj: Permiso ) => {
        return new Promise( ( resolve , reject ) => {

            // create the query ->
            let query = 'INSERT into permisos (Codigo, Descripcion, EnUso)'
            + 'VALUES (?, ?, ?)';
    
            // Params ->
            let params = [ obj.Codigo, obj.Descripcion, obj.EnUso ? 1 : 0 || 1]; // VER BIEN ESTO (BOOLEANOS EN MYSQL)
    
            //Save data ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res ){
                    resolve(res.insertId);
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });


    }

    //  load permiso by id ->
    loadById = ( id: number ) => {
        return new Promise( ( resolve , reject ) => {

            // Create query ->
            let query = 'SELECT *from permisos where id = ?';
            
            // Params ->
            let params = [id];
    
            // execute query ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res ){
                    resolve( res );
                }
            }, ( err: any) => {
                console.log( err );
                reject( err );
            });

        });
    }

    // Baja permiso by id 
    bajaById = ( id: number ) => {
        return new Promise( ( resolve , reject ) => {

            // create query ->
            let query = ' Update permisos Set EnUso = 0 WHERE id = ?';
    
            // params ->
            let params = [id];
    
            // execute query ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res ){
                    resolve( res );
                }
            }, ( err: any) => {
                console.log( err );
               reject( err );
            });

        });

    }


    // Get permisos by usuario Id ->
    getByUsuarioId = ( id: number ) => {
        return new Promise( ( resolve , reject ) => {

            let query = 'Select *from Permisos p'
            + 'inner join usuariospermisos up on p.id = up.id'
            + 'Where up.id = ? AND EnUso = 1';
    
            // params ->
            let params = [id];
            
            // execute query ->
            this.db.executeQuery(query, params, ( res: any ) => {
                if( res ){
                    resolve( res );
                }
            }, ( err: any) => {
                console.log( err );
               reject( err );
            });

        });
    }

    // existe permiso ->
    existPermission = ( id: number ) => {
        return new Promise( ( resolve , reject ) => {

            // create the query ->
            let query = 'Select * from permisos WHERE id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                // Si encuentra algo retorno true ->
                if( res.length > 0 ){
                    resolve( true );
                }
                resolve( false );
                
            }, ( err: any ) => {
                console.log( err );
               reject( err );
            });
        });
    }

    existPermisoTouser = (idUser: number, idPermiso: number) => {
        return new Promise( ( resolve , reject ) => {

            // create the query ->
            let query = 'Select * from Usuariospermisos WHERE UsuarioId = ? AND PermisoId = ?';
    
            // Params ->
            let params = [idUser, idPermiso];
    
            // Execute query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                // Si encuentra algo retorno true ->
                if( res.length > 0 ){
                    resolve( true );
                }
                resolve( false );
                
            }, ( err: any ) => {
                console.log( err );
               reject( err );
            });
        });
    }

    // Este metodo agrega un permiso al usuario ->
    addPermissionToUser = ( userId: number, permissId: number ) => {
        return new Promise( async( resolve , reject ) => {
            
            // validate the existence of the user ->
            if( ! await this.userService.existUser(userId) ){
               return reject(' User does not Exist');
            }
    
            // validate the existence of the permission ->
            if ( ! await this.existPermission( permissId ) ){
               return reject('Permission does not Exist');
            }
    
            // Valido que el usuario no tenga ese permiso ->
            if( await this.existPermisoTouser( userId, permissId )){
                return reject('El usuario ya tiene ese permiso')
            }
    
            // Crete the query ->
            let query = 'INSERT into usuariospermisos (UsuarioId, PermisoId)'
            + 'VALUES (?, ?)';
    
            // Create the params ->
            let params = [userId, permissId];
    
            // Execute ->
              // execute query ->
              this.db.executeQuery(query, params, ( res: any ) => {
                if( res ){
                    resolve( res );
                }
            }, ( err: any) => {
                console.log( err );
               reject( err );
            });

        });
        
    }



    /**
     * Este metodo elimina el permiso de un usuario
     * @param userId 
     * @param permisoId 
     */
    deletePermisoFromUser = (userId: number, permisoId: number) => {

        return new Promise<void>( async(resolve, reject) => {

            // validate the existence of the user ->
            if( ! await this.userService.existUser(userId) ){
               return reject(' User does not Exist');
            }
    
            // validate the existence of the permission ->
            if ( ! await this.existPermission( permisoId ) ){
               return reject('Permission does not Exist');
            }

            // Crete the query ->
            let query = 'DELETE FROM usuariospermisos WHERE UsuarioId = ? AND PermisoId = ?';

            // Ejecuto ->
            this.db.executeQuery(query, [userId, permisoId], (res: any) => {
                resolve();
            }, (err: any )=> {
                reject(err);
            })


        })



    }

}


export default PermisoService;