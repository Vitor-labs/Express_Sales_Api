import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT = jwt;

class TokenAuth {

    verify_token = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.token as string;
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }
        JWT.verify(token, process.env.JWT_SEC as string, (err) => {
            if (err) {
                return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            next();
        });
    }

    verifyTokenAuth = (req: Request, res: Response, next: NextFunction) => {
        this.verify_token(req, res, () => {
            const { id, isAdmin } = req.body;
            if (id !== req.params.id || isAdmin) {
                return res.status(403).send({ auth: false, message: 'Unauthorized' });
            }
            next();
        });
    }

    verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
        this.verify_token(req, res, () => {
            if (req.body.isAdmin) {
                next();
            } else {
                res.status(403).json("You are not alowed to do that!");
            }
        });
    };
}

export default new TokenAuth();