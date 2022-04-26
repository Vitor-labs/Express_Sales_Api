import express from "express";

// internal imports
import Middleware from '../middleweres/validations_handler';
import UserValidator from '../validators/Validator';
import UserController from '../controllers/User';
import TokenAuth from "../auth/veriryTokens";


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
    TokenAuth.verifyTokenAuth,
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