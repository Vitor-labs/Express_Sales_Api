import express from "express";

// internal imports
import Middleware from '../middleweres/validations_handler';
import UserValidator from '../validators/UserValidator';
import UserController from '../controllers/User';
import TokenAuth from "../auth/veriryTokens";

// basicaly the server routes are locked if you are not logged in
// or are a admin, and you cannot create a admin user if you are
// not an admin, só first desactivate the admin-token verification
// and then create a admin user, so then you can acess the other 
// routes

const userRoute = express.Router();

// Login a user and return a JWT token
userRoute.post('/login',
    UserValidator.checkLogin(),
    Middleware.handle,
    UserController.loginUser);

// CREATE A SINGLE USER
userRoute.post('/',
    TokenAuth.verifyTokenAndAdmin,
    UserValidator.checkCreateUser(),
    Middleware.handle,
    UserController.createUser);

// GET ALL THE USERS
userRoute.get('/',
    TokenAuth.verifyTokenAndAdmin,
    UserValidator.checkLimits(),
    Middleware.handle,
    UserController.getUsers);

// GET A SINGLE USER
userRoute.get('/:id',
    TokenAuth.verifyTokenAuth,
    UserValidator.checkId(),
    Middleware.handle,
    UserController.getUser);

// UPDATE A SINGLE USER
userRoute.patch('/:id',
    TokenAuth.verifyTokenAndAdmin,
    UserValidator.checkId(),
    Middleware.handle,
    UserController.updateUser);

// DELETE A SINGLE USER
userRoute.delete('/:id',
    TokenAuth.verifyTokenAndAdmin,
    UserValidator.checkId(),
    Middleware.handle,
    UserController.deleteUser);


export default userRoute;