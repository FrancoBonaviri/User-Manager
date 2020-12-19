/*
    This function gets the errors in the request and throw them 
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/


// imports ->
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

const bodyValidate = ( req: Request, res: Response, next: any ) => {

    // get the errors ->
    const errors = validationResult( req );

    // if are errors, return ->
    if( !errors.isEmpty() ){
        return res.status(400).json(
        { 
            ok: false,
            errors: errors.mapped() 
        });
    }

    // continue the exec ->
    next();
}




export default bodyValidate;