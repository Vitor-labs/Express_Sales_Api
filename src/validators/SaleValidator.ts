import { query, param } from "express-validator";

class SaleValidator {
    checkSaleOrReserve() {
        return [
            query('saler')
                .exists().withMessage('saler is required')
                .isUUID(4).withMessage('saler must be a valid uuid'),
            query('venicle')
                .exists().withMessage('venicle is required')
                .isUUID(4).withMessage('venicle must be a valid uuid')
        ];
    }
    checkId() {
        return [
            param('id')
                .exists().withMessage('id is required')
                .notEmpty().withMessage('id cannot be empty')
                .isUUID(4).withMessage('The value should be UUID v4')
        ];
    }
    checkStatusOfSales() {
        return [
            query('saled')
                .exists().withMessage('status is required')
                .isIn(['on_sale', 'sold', 'reserved']).withMessage('status must be on sale or sold or reserved')
        ];
    }
}

export default new SaleValidator();