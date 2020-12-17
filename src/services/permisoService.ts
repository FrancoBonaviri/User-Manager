/*
    This is the permiso service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 16/12/2020
    Last update: 16/12/2020
*/

//  imports 
import SqlConnection from '../Database/Base';
import Permiso from '../models/Permiso';



class PermisoService {
    
    constructor(
        private db: SqlConnection
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

}