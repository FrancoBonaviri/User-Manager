/*
    This is the direccion service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/

// Imports ->
import SqlConnection from '../Database/Base';
import Domicilio from '../models/Domicilio';


class DomicilioService {
    
    private db: SqlConnection = new SqlConnection()

    //  insert domicilio ->
    insert = (direcc: Domicilio) => {

        // Create the query ->
        let query = 'INSERT into domicilio (Numero, CalleA, CalleB, CalleC, Ciudad, Pais, CodigoPostal)'
        + ' VALUES (?, ?, ?, ?, ?, ?, ?)';

        // Params ->
        let params = [ direcc.numero, direcc.CalleA, direcc.CalleB || null, direcc.CalleC || null, direcc.Ciudad, direcc.Pais, direcc.CodigoPostal ];

        // Execute query ->
        this.db.executeQuery( query, params , ( res: any) => {
            if( res ){
                return res;
            }
        }, ( err: any ) => {
            console.log(err);
            throw new Error( err );
        });
    }

    // Get direccion by id
    getById( id: number ): any  {

        // crete the query ->
        let query = 'SELECT * from domicilio where id = ?';

        // Params ->
        let params = [id];

        // Execute the query ->
        this.db.executeQuery( query, params, ( res: any ) => {
            if( res ){
                return new Domicilio( res );
            }
        }, ( err: any ) => {
            console.log(err);
            throw new Error( err );
        });

    }

    // Delete direccion by id ->
    deleteById = ( id: number ) => {

        // crete the query ->
        let query = 'Delete domicilio WHERE id = ?';

        // Params ->
        let params = [id];

        // Execute the query ->
        this.db.executeQuery( query, params, ( res: any ) => {
            if( res ){
                return res;
            }
        }, ( err: any ) => {
            console.log(err);
            throw new Error( err );
        });

    }

    // Exist domicilio ->
    existDomicilio = ( id: number ) => {
        
        // query ->
        let query = 'SELECT COUNT(*) from domicilio WHERE id = ?';

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




export default DomicilioService;