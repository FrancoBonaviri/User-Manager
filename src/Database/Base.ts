/*
    This is the master class of the database 
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 15/12/2020
    Last update: 15/12/2020
*/


// imports ->
import mysql from 'mysql';


class SqlConnection {
    // attributes ->
    connection: mysql.Connection;
    // queryString: string = '';

    // Start the mysql connection ->
    constructor() {
        this.connection = mysql.createConnection(
        {
            host: 'localHost',
            user: 'root',
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_USER
        });
    }


    // This method execute query and returns the result in a callback
    public executeQuery = (query: string, params: any[], callBack: Function, callbackError: Function) => {

        //Start the connection ->
        this.connection.connect();

        // execute the query ->
        this.connection.query( query, params, ( err, result ) => {
            if( err ) {
                this.connection.end();
                return callbackError( err );
            }

            this.connection.end();
            callBack( result );
        });
    }
}

export default  SqlConnection;