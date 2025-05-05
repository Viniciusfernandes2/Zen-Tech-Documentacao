import Colinas from '../models/ColinasScheme';
import { Request, Response } from 'express';

class ColinasController {
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const colinas = req.body;
            const newColinas = await Colinas.create(colinas);
            res.status(201).json(newColinas);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async read(_req: Request, res: Response): Promise<void> {
        try {
            const colinas = await Colinas.find().limit(10);
            res.status(200).json(colinas);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const colinas = req.body;
            const updatedColinas = await Colinas.findByIdAndUpdate(id, colinas, { new: true });
            res.status(200).json(updatedColinas);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await Colinas.findByIdAndDelete(id);
            res.status(200).json({ message: 'Estação deletada com sucesso' });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }

    }
}

const colinasController = new ColinasController();
export default colinasController;