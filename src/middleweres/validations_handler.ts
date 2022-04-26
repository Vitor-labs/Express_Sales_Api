import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

class Middlewere {
    handle(req: Request, res: Response, next: NextFunction) {
        console.log('\nRunning middlewere...');
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() });
        }
        console.log('All ok... Middlewere finished');
        next();
    }
}

export default new Middlewere();