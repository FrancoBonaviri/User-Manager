/*
    This is the direccion service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 31/12/2020
    Last update: 31/12/2020
*/

// Imports ->
import SqlConnection from '../Database/Base';
import Domicilio from '../models/Domicilio';
import domicilio from '../interfaces/domicilio';


class DomicilioService {
    
    private db: SqlConnection = new SqlConnection()

    //  insert domicilio ->
    insert = (direcc: Domicilio): Promise<number> => {

        return new Promise( ( resolve , reject ) => {

            // Create the query ->
            let query = 'INSERT into domicilio (Numero, CalleA, CalleB, CalleC, Ciudad, Pais, CodigoPostal)'
            + ' VALUES (?, ?, ?, ?, ?, ?, ?)';
    
            // Params ->
            let params = [ direcc.numero, direcc.CalleA, direcc.CalleB || null, direcc.CalleC || null, direcc.Ciudad, direcc.Pais, direcc.CodigoPostal ];
    
            // Execute query ->
            this.db.executeQuery( query, params , async( res: any) => {
                if( res ){
                    resolve( res.insertId );
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });

    }

    // Get direccion by id
    getById = ( id: number ) =>  {

        return new Promise<any>( ( resolve , reject ) => {

            // crete the query ->
            let query = 'SELECT * from domicilio where id = ?';
    
            // Params ->
            let params = [id];
    
            // Execute the query ->
            this.db.executeQuery( query, params, ( res: any ) => {
                if( res?.length > 0 ){
                    resolve( this.fill( res[0] ) );
                } else {
                    resolve( null );
                }
            }, ( err: any ) => {
                console.log(err);
                reject( err );
            });

        });

    }

    // Get all Direcciones 
    getAll = () =>  {

        return new Promise<any[]>( ( resolve , reject ) => {

            // crete the query ->
            let query = 'SELECT * from domicilio';
    
            // Execute the query ->
            this.db.executeQuery( query, [], ( res: any ) => {
                if( res?.length > 0  ){
                    resolve( this.fillList( res ) );
                } else {
                    resolve( [] );
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
                if( res[0] === 1 ){
                   return resolve( true );
                }
               resolve( false );
            }, ( err: any ) => {
                console.log( err );
                reject( err );
            });

        });
        
    }


    private fill = ( obj: any ): domicilio => {
        
        // Create the object ->
        const domicilio: domicilio = {
            id: obj.id,
            Numero: obj.Numero,
            CalleA: obj.CalleA,
            CalleB: obj.CalleB || null,
            CalleC: obj.CalleC || null,
            Ciudad: obj.Ciudad,
            Pais: obj.Pais,
            CodigoPostal: obj.CodigoPostal 
        }


        return domicilio;
    }

    private fillList = ( objs: any[] ): domicilio[] => {

        // create the array ->
        let domiciliosArr: domicilio[] = []; 

        //  add items to array ->
        objs.forEach( (obj: any) => {
            domiciliosArr.push( this.fill( obj ) );
        });


        return domiciliosArr;
    } 

}




export default DomicilioService;