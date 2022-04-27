import { body, query, param } from "express-validator";

class Validator {
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

    checkLogin() {
        return [
            body('id')
                .exists().withMessage('id is required')
                .isUUID(4).withMessage('id must be a valid uuid'),
            body('password')
                .exists().withMessage('password is required')
                .isLength({ min: 6 }).withMessage('password is too short')
        ]
    }

    checkCreateUser() {
        return [
            body('id')
                .optional()
                .isUUID(4)
                .withMessage('The value should be UUID v4'),
            body('name')
                .exists().withMessage('name is required')
                .isLength({ min: 6 }).withMessage('name must be at least 6 characters long'),
            body('email')
                .exists().withMessage('email is required')
                .isEmail().withMessage('email must be a valid email'),
            body('password')
                .exists().withMessage('password is required')
                .isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
            body('cpf')
                .exists().withMessage('cpf is required')
                .isLength({ min: 11 }).withMessage('cpf must be at least 11 characters long'),
            body('isAdmin')
                .optional()
                .isBoolean().withMessage('isAdmin must be a boolean')
                .isIn([true, false]).withMessage('isAdmin must be true or false')
        ]
    }
    checkCreateVenicle() {
        return [
            body('id')
                .optional()
                .isUUID(4)
                .withMessage('The value should be UUID v4'),
            body('mark')
                .exists().withMessage('mark is required')
                .isString().withMessage('mark should be string'),
            body('model')
                .exists().withMessage('model is required')
                .isString().withMessage('model should be string')
                .isLength({ min: 6 }).withMessage('model must be at least 6 characters long'),
            body('year')
                .exists().withMessage('year is required')
                .isInt({ min: 1980, max: 2022 }).withMessage('year must be between 1980 and 2022'),
            body('color')
                .exists().withMessage('color is required')
                .isLength({ min: 6 }).withMessage('color must be at least 6 characters long'),
            body('price')
                .exists().withMessage('price is required')
                .isNumeric().withMessage('price must be a number'),
            body('description')
                .optional()
                .isString().withMessage('description should be string'),
            body('saled')
                .optional()
                .isBoolean().withMessage('isAvailable must be a boolean')
                .isIn([true, false]).withMessage('isAvailable must be true or false')
        ]
    }
    checkLimits() {
        return [
            query('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('The limit value should be number and between 1-10'),
            query('offset')
                .optional()
                .isNumeric()
                .withMessage('The value should be number'),
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

export default new Validator();