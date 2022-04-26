import express from "express";

// internal imports
import Middleware from '../middleweres/validations_handler';
import VenicleValidator from '../validators/Validator';
import VenicleController from '../controllers/Venicle';
import TokenAuth from "../auth/veriryTokens";

const venicleRoute = express.Router();

// SALE A SINGLE VENICLE
venicleRoute.put('/sell',
    TokenAuth.verifyTokenAuth,
    VenicleValidator.checkSaleOrReserve(),
    Middleware.handle,
    VenicleController.sellVenicle);

// RESERVATE A SINGLE VENICLE
venicleRoute.put('/reserve',
    TokenAuth.verifyTokenAuth,
    VenicleValidator.checkSaleOrReserve(),
    Middleware.handle,
    VenicleController.reserveVenicle);

// CREATE A SINGLE VENICLE
venicleRoute.post('/',
    TokenAuth.verifyTokenAndAdmin,
    VenicleValidator.checkCreateVenicle(),
    Middleware.handle,
    VenicleController.createVenicle);

// GET ALL THE VENICLES
venicleRoute.get('/',
    TokenAuth.verifyTokenAuth,
    VenicleValidator.checkLimits(),
    Middleware.handle,
    VenicleController.getVenicles);

// GET ALL VENICLES SALED OR NOT
venicleRoute.get('/status',
    TokenAuth.verifyTokenAuth,
    VenicleValidator.checkLimits(),
    VenicleValidator.checkStatusOfSales(),
    Middleware.handle,
    VenicleController.getVenicleByStatus);

// GET A SINGLE VENICLE
venicleRoute.get('/:id',
    TokenAuth.verifyTokenAuth,
    VenicleValidator.checkId(),
    Middleware.handle,
    VenicleController.getVenicle);

// UPDATE A SINGLE VENICLE
venicleRoute.patch('/:id',
    TokenAuth.verifyTokenAndAdmin,
    VenicleValidator.checkId(),
    Middleware.handle,
    VenicleController.updateVenicle);

// DELETE A SINGLE VENICLE
venicleRoute.delete('/:id',
    TokenAuth.verifyTokenAndAdmin,
    VenicleValidator.checkId(),
    Middleware.handle,
    VenicleController.deleteVenicle);


export default venicleRoute;