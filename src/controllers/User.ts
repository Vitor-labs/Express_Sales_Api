import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from "uuid";

// internal imports
import { User } from "../models/Users";

// Register a new user
class UserController {
    async loginUser(req: Request, res: Response) {
        const { id, password } = req.body;
        const pass = process.env.SECRET_KEY as string;
        try {
            const user = await User.findOne({
                attributes: ['id', 'isAdmin', 'password'],
                where: { id: id }
            });
            if (!user) {
                res.status(404).send({ msg: "User not found" });
            } else {
                const isPasswordValid = bcrypt.compareSync(password, user.getDataValue('password'));
                if (!isPasswordValid) {
                    res.status(401).send({ msg: "Invalid password" });
                } else {
                    const token = jwt.sign(
                        { id: user.getDataValue('id'), isAdmin: user.getDataValue('isAdmin') },
                        pass,
                        { expiresIn: "1h" }
                    );
                    res.status(200).send({ msg: "User logged in", token, "expiresIn": "1h" });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async createUser(req: Request, res: Response) {
        const id = v4();
        const password = bcrypt.hashSync(req.body.password, 10);
        try {
            await User.create({
                ...req.body, id: id, password: password
            });
            res.status(201).send({ msg: "User created", id: id });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getUsers(req: Request, res: Response) {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;
        try {
            const users = await User.findAll({
                where: {}, limit: limit, offset: offset
            });
            res.status(200).send(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getUser(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const user = await User.findOne({
                where: { id }
            });
            if (!user) {
                res.status(404).send({ msg: "User not found" });
            }
            res.status(200).send(user);

        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateUser(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const user = await User.findOne({
                where: { id }
            });
            if (!user) {
                res.status(404).send({ msg: "User not found" });
            } else {
                await User.update(req.body, {
                    where: { id }
                });
                res.status(200).send({ msg: "User updated", id: id });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const user = await User.findOne({
                where: { id }
            });
            if (!user) {
                res.status(404).send({ msg: "User not found" });
            } else {
                await User.destroy({
                    where: { id }
                });
                res.status(200).send({ msg: "User deleted", id: id });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default new UserController();