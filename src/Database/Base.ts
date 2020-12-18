/*
    This is the master class of the database 
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/


// imports ->
import mysql from 'mysql';
require('dotenv').config()


class SqlConnection {
    // attributes ->
    connection: mysql.Connection;
    // queryString: string = '';

    // Start the mysql connection ->
    constructor() {
        console.log(process.env.DATABASE_USER, process.env.DATABASE_PASSWORD)
        this.connection = mysql.createConnection(
        {
            host: 'localHost',
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: 'usuariomanager',
            insecureAuth: true
        });
    }
    
    
    // This method execute query and returns the result in a callback
    public executeQuery = (query: string, params: any[], callBack: Function, callbackError: Function) => {
        
        
        // execute the query ->
        try {
            this.connection.query( query, params, ( err , res) => {

                if( err ) {
                    return callbackError( err );
                }

                callBack( res );
            });
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default  SqlConnection;