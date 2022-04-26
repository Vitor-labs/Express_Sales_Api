import { Request, Response } from 'express';

import { v4 } from "uuid";
import Venicle from '../models/Venicles';
import { User } from "../models/Users";
import { Sale } from "../models/Sales";

class VenicleController {
    // return all venicles saled or not - TESTED: OK
    async getVenicleByStatus(req: Request, res: Response) {
        const saled = req.query?.saled as string | undefined;
        try {
            const venicles = await Venicle.findAll({
                where: { status: saled }
            });
            if (!venicles) {
                res.status(404).send({ msg: "Venicles not found" });
            } else {
                res.status(200).send(venicles);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
    // sell a venicle - TESTED: OK
    async sellVenicle(req: Request, res: Response) {
        const saler = req.query?.saler as string | undefined; // user id
        const venicleId = req.query?.venicle as string | undefined; // id of venicle
        try {
            const venicle = await Venicle.findOne({
                where: { id: venicleId }
            });
            console.log(venicle);
            const vendor = await User.findOne({
                where: { id: saler }
            });
            if (!venicle || !vendor) {
                res.status(404).send({ msg: "Venicle or vendor not found" });
            } else {
                const ven = Venicle.getAttributes();
                console.log(ven);
                await Venicle.update(
                    { status: 'sold' },
                    {
                        where: { id: venicleId }
                    });
                await User.increment('sales', {
                    by: 1,
                    where: { id: saler }
                });
                res.status(200).send(
                    { msg: "Venicle sold", id: venicleId, saler: saler });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    // reserve a venicle not sold - TESTED: OK
    async reserveVenicle(req: Request, res: Response) {
        const saler = req.query?.saler as string | undefined; // user id
        const venicleId = req.query?.venicle as string | undefined; // id of venicle
        try {
            const venicle = await Venicle.findOne({
                where: { id: venicleId }
            });
            console.log(venicle);
            const vendor = await User.findOne({
                where: { id: saler }
            });
            if (!venicle || !vendor) {
                res.status(404).send({ msg: "Venicle or vendor not found" });
            } else {
                await Venicle.update(
                    { status: 'reserved' },
                    {
                        where: { id: venicleId }
                    });
                await User.increment('reservations', {
                    by: 1,
                    where: { id: saler }
                });
                res.status(200).send(
                    { msg: "Venicle reserved", id: venicleId, saler: saler });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    // Crud of venicle - TESTED: OK
    async createVenicle(req: Request, res: Response) {
        const id = v4();
        try {
            console.log(req.body);
            await Venicle.create({
                ...req.body, id
            });
            res.status(201).send({ msg: "Venicle created", id: id });
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    // cRud of venicle [RETURN ALL VENICLES] - TESTED: OK
    async getVenicles(req: Request, res: Response) {
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.offset as number | undefined;

        try {
            const venicles = await Venicle.findAll({
                where: {}, limit: limit, offset: offset
            });
            res.status(200).send(venicles);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    // cRud of venicle [RETURN ONE VENICLE] - TESTED: OK
    async getVenicle(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const venicle = await Venicle.findOne({
                where: { id }
            });
            if (!venicle) {
                res.status(404).send({ msg: "Venicle not found" });
            } else {
                res.status(200).send(venicle);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    // crUd of venicle - TESTED: OK
    async updateVenicle(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const venicle = await Venicle.findOne({
                where: { id }
            });
            if (!venicle) {
                res.status(404).send({ msg: "Venicle not found" });
            } else {
                const updatedVenicle = await Venicle.update(req.body, {
                    where: { id }
                });
                res.status(200).send(updatedVenicle);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
    // cruD of venicle - TESTED: OK
    async deleteVenicle(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const venicle = await Venicle.findOne({
                where: { id }
            });
            if (!venicle) {
                res.status(404).send({ msg: "Venicle not found" });
            } else {
                await Venicle.destroy({
                    where: { id }
                });
                res.status(200).send({ msg: "Venicle deleted", id: id });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default new VenicleController();