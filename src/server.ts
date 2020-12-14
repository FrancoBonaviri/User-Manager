/*
    This is the initial server configuration of the application 
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 14/12/2020
    Last update: 14/12/2020
*/

// Importando express y el tipado para typescript ->
import express from 'express';
import { Application } from 'express';


// Server Class ->
class Server {

    //Aplication attribute ->
    private app: Application;

    //Constructor whit the port application ->
    constructor(private port?: number) {

        // Initialized express ->
        this.app = express();
    }

    // Start server message ->
    private start(): void {
        console.log('Server Starting ....');
    }

    // set the port ->
    private setting(): void {
        this.app.set( 'port', this.port || process.env.PORT );
    }


    // Running the server ->
    listen() {
        this.app.listen( this.port, () => {
            console.log("Server running on port: " + this.port);
        });
    }
}


export default Server;

