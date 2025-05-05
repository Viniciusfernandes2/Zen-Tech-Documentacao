import Reserv from '../models/ReservScheme';
import { Request, Response } from 'express';

class ResevController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const reserv = req.body;
            const newStation = await Reserv.create(reserv);
            res.status(201).json(newStation);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async read(_req: Request, res: Response): Promise<void> {
        try {
            const station = await Reserv.find().limit(10);
            res.status(200).json(station);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const station = req.body;
            const updatedStation = await Reserv.findByIdAndUpdate(id, station, { new: true });
            res.status(200).json(updatedStation);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Reserv.findByIdAndDelete(id);
            res.status(200).json({ message: 'Estação deletada com sucesso' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }

    }
}

const reservController = new ResevController();
export default reservController;