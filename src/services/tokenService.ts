/*
    This is the token service class (CRUD)
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 11/01/2021
    Last update: 11/01/2021
*/

import jwt from 'jsonwebtoken';
import usuario from '../interfaces/usuario';




class TokenService {

    private static seed: string = process.env.TOKEN_SECRET_SEED || '123456789';
    private static caducidad: string = process.env.CADUCIDAD_TOKEN || '123456789' ;


    static generateToken(payload: usuario){

        // Creo el token ->
        const token = jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });

        // devuelvo el token ->
        return token;
    }

    static comprobarToken( token: string ) {

        return jwt.verify( token, this.seed, ( err, decoded ) => {
            if(err) { return null;}
            else {return decoded; }
        })
    }

}



export default TokenService;