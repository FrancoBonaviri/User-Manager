/*
    This is the user controller file of the server  
    author: Franco Bonaviri | francobonaviri@hotmail.com
    Created: 18/12/2020
    Last update: 18/12/2020
*/

// imports ->
import UserService from "../services/userService";
import { Request, Response } from "express";


class UserController {

    private userSevice: UserService = new UserService();


    getUsers = async ( req: Request, res: Response ) => {
        
        // Get the users ->
        const user = await this.userSevice.getAll();

        // return ->
        res.json({
            ok: true,
            user
        });
    }
}



export default UserController;