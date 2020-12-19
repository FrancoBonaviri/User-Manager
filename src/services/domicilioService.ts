/*
    This is the direccion service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 19/12/2020
    Last update: 19/12/2020
*/

// Imports ->
import SqlConnection from '../Database/Base';
import Domicilio from '../models/Domicilio';


class DomicilioService {
    
    private db: SqlConnection = new SqlConnection()

    //  insert domicilio ->
    insert = (direcc: Domicilio) => {

        return new Promise( ( resolve , reject ) => {

            // Create the query ->
            let query = 'INSERT into domicilio (Numero, CalleA, CalleB, CalleC, Ciudad, Pais, CodigoPostal)'
            + ' VALUES (?, ?, ?, ?, ?, ?, ?)';
    
            // Params ->
            let params = [ direcc.numero, direcc.CalleA, direcc.CalleB || null, direcc.CalleC || null, direcc.Ciudad, direcc.Pais, direcc.CodigoPostal ];
    
            // Execute query ->
            this.db.executeQuery( query, params , ( res: any) => {
                if( res ){
                    resolve( res );
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });

    }

    // Get direccion by id
    getById( id: number )  {

        return new Promise<Domicilio>( ( resolve , reject ) => {

            // crete the query ->
            let query = 'SELECT * from domicilio where id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute the query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                if( res ){
                    resolve(new Domicilio( res ));
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });

    }

    // Delete direccion by id ->
    deleteById = ( id: number ) => {

        return new Promise( ( resolve , reject ) => {
            
            // crete the query ->
            let query = 'Delete domicilio WHERE id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute the query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                if( res ){
                    resolve( res  );
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });


    }

    // Exist domicilio ->
    existDomicilio = ( id: number ) => {

        return new Promise<boolean>( ( resolve , reject ) => {

            // query ->
            let query = 'SELECT COUNT(*) from domicilio WHERE id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                // Si encuentra algo retorno true ->
                if( res === 1 ){
                   resolve( true );
                }
               return false;
            }, ( err: any ) => {
                console.log( err );
                reject( err );
            });

        });
        
    }

}




export default DomicilioService;