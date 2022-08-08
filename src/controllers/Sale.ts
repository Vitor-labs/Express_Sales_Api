import { Request, Response } from 'express';

import Venicle from '../models/Venicles';
import { User } from "../models/Users";

class SaleController {
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
    // cancel a reservation - TESTED: OK
    async cancelReservation(req: Request, res: Response) {
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
                    { status: 'available' },
                    {
                        where: { id: venicleId }
                    });
                await User.decrement('reservations', {
                    by: 1,
                    where: { id: saler }
                });
                res.status(200).send(
                    { msg: "Reservation canceled", id: venicleId, saler: saler });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

export default new SaleController;