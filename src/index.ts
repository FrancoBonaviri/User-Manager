/*
    This is the initial file of the application 
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 14/12/2020
    Last update: 14/12/2020
*/

// Import the server ->
import Server from './server'

//Starting function ->
const main = () => {
    const app = new Server( 3001 );

    app.listen();
}

// play the game ->
main();