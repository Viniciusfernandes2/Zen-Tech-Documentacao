import Station from '../models/StationScheme';
import { Request, Response } from 'express';

class StationController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const station = req.body;
            const newStation = await Station.create(station);
            res.status(201).json(newStation);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async read(_req: Request, res: Response): Promise<void> {
        try {
            const station = await Station.find();
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
            const updatedStation = await Station.findByIdAndUpdate(id, station, { new: true });
            res.status(200).json(updatedStation);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Station.findByIdAndDelete(id);
            res.status(200).json({ message: 'Estação deletada com sucesso' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }

    }
}

const stationController = new StationController();
export default stationController;