/*
    This is the permiso service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/

//  imports 
import SqlConnection from '../Database/Base';
import Permiso from '../models/Permiso';
import UserService from './userService';



class PermisoService {
    
    constructor(
        private db: SqlConnection,
        private userService: UserService
    )
    {}

    // insert permiso 
    insert = ( obj: Permiso ) => {

        // create the query ->
        let query = 'INSERT into permisos (Codigo, Descripcion, EnUso)'
        + 'VALUES (?, ?, ?)';

        // Params ->
        let params = [ obj.Codigo, obj.Descripcion, obj.EnUso ? 1 : 0 || 1]; // VER BIEN ESTO (BOOLEANOS EN MYSQL)

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

    //  load permiso by id ->
    loadById = ( id: number ) => {

        // Create query ->
        let query = 'SELECT *from permisos where id = ?';
        
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

    // Baja permiso by id 
    bajaById = ( id: number ) => {

        // create query ->
        let query = ' Update permisos Set EnUso = 0 WHERE id = ?';

        // params ->
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


    // Get permisos by usuario Id ->
    getByUsuarioId = ( id: number ) => {

        let query = 'Select *from Permisos p'
        + 'inner join usuariospermisos up on p.id = up.id'
        + 'Where up.id = ? AND EnUso = 1';

        // params ->
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

    // existe permiso ->
    existPermission = ( id: number ): any => {
        // create the query ->
        let query = 'Select COUNT(*) from permisos WHERE id = ?';

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

    // Este metodo agrega un permiso al usuario ->
    addPermissionToUser = ( userId: number, permissId: number ) => {
        
        // validate the existence of the user ->
        if( !this.userService.existUser(userId) ){
            throw new Error(' User does not Exist');
        }

        // validate the existence of the permission ->
        if ( !this.existPermission( permissId ) ){
            throw new Error('Permission does not Exist');
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
                return res;
            }
        }, ( err: any) => {
            console.log( err );
            throw new Error( err );
        });
        
    }

}