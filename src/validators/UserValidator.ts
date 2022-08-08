import { body, query, param } from "express-validator";

class UserValidator {
    checkId() {
        return [
            param('id')
                .exists().withMessage('id is required')
                .notEmpty().withMessage('id cannot be empty')
                .isUUID(4).withMessage('The value should be UUID v4')
        ];
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
}

export default new UserValidator();