import { body, query, param } from "express-validator";

class VenicleValidator {
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
}

export default new VenicleValidator();