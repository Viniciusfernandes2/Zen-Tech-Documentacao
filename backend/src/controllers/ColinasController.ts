import { Request, Response } from 'express';
import { ColinasServices } from '../Services/ColinasServices';

class ColinasController {
    private colinasService: ColinasServices;

    constructor(colinasService: ColinasServices) {
        this.colinasService = colinasService;
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { Date, Time, Temp_C, Hum_, Press_Bar, TempCabine_C, Charge, SR_Wm2, WindPeak_ms, WindSpeed_Inst, WindSpeed_Avg, WindDir_Inst, WindDir_Avg } = req.body;

            if (!Date || !Time || Temp_C === undefined || Hum_ === undefined || Press_Bar === undefined) {
                res.status(400).json({ message: 'Campos obrigatórios estão faltando.' });
                return;
            }
            const newColinas = await this.colinasService.createColinas(req.body);
            res.status(201).json(newColinas);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    public async read(_req: Request, res: Response): Promise<void> {
        try {
            const colinas = await this.colinasService.getColinas();

            if (colinas.length === 0) {
                res.status(404).json({ message: 'Nenhum dado encontrado.' });
            }

            res.status(200).json(colinas);
        } catch (err) {
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'O parâmetro "id" é obrigatório.' });
                return;
            }
            const updatedColinas = await this.colinasService.updateColinas(id, req.body);

            if (updatedColinas.message) {
                res.status(404).json({ message: updatedColinas.message });
                return;
            }
            res.status(200).json(updatedColinas);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'O parâmetro "id" é obrigatório.' });
                return;
            }
            await this.colinasService.deleteColinas(id);
            res.status(200).json({ message: `Colina com o id ${id} deletada com sucesso.` });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default ColinasController;