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
                    resolve(res);
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
            let query = 'Select COUNT(*) from permisos WHERE id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                // Si encuentra algo retorno true ->
                if( res === 1 ){
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
            if( !this.userService.existUser(userId) ){
               reject(' User does not Exist');
            }
    
            // validate the existence of the permission ->
            if (  !this.existPermission( permissId ) ){
               reject('Permission does not Exist');
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

}