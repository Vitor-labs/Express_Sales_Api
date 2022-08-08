import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

require('dotenv').config();

const JWT = jwt;

class TokenAuth {
    verify_token = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.token as string;
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }
        const secret = process.env.SECRET_KEY as string;
        try {
            next();
            JWT.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                }
                // if everything good, save to request for use in other routes
                req.body = decoded;
                next();
            });
        } catch (error) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
    }
    // basicaly i thinked that only the user with the admin role can access tother users data, but
    // you, or other user can acess the data about himself
    verifyTokenAuth = (req: Request, res: Response, next: NextFunction) => {
        this.verify_token(req, res, () => {
            const { id, isAdmin } = req.body;
            if (id !== req.params.id || isAdmin) {
                return res.status(403).send({ auth: false, message: 'Unauthorized' });
            }
            next();
        });
    }
    // this is the same as verifyTokenAuth but for the admin
    verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
        this.verify_token(req, res, () => {
            console.log(req.body.isAdmin);
            if (req.body.isAdmin) {
                next();
            } else {
                return res.status(403).json("You are not alowed to do that!");
            }
        });
    };
}

export default new TokenAuth();