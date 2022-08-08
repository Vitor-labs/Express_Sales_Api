import { Request, Response } from 'express';

import { v4 } from "uuid";
import Venicle from '../models/Venicles';

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