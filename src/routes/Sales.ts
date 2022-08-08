import express from "express";

// internal imports
import Middleware from '../middleweres/validations_handler';
import SaleValidator from '../validators/SaleValidator';
import SaleController from '../controllers/Sale';
import TokenAuth from "../auth/veriryTokens";

const venicleRoute = express.Router();

// SALE A SINGLE VENICLE
venicleRoute.put('/sell',
    TokenAuth.verifyTokenAuth,
    SaleValidator.checkSaleOrReserve(),
    Middleware.handle,
    SaleController.sellVenicle);

// RESERVATE A SINGLE VENICLE
venicleRoute.put('/reserve',
    TokenAuth.verifyTokenAuth,
    SaleValidator.checkSaleOrReserve(),
    Middleware.handle,
    SaleController.reserveVenicle);

// GET ALL THE SALES


export default venicleRoute;