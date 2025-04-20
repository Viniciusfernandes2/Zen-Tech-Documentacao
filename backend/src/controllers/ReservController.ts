import { Request, Response } from 'express';
import { ReserveService } from '../Services/ReserveService';

class ReservController {
  private stationService: ReserveService;

  constructor(stationService: ReserveService) {
    this.stationService = stationService;
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const station = req.body;
      const newStation = await this.stationService.createStation(station);
      res.status(201).json(newStation);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  public async read(_req: Request, res: Response): Promise<void> {
    try {
      const stations = await this.stationService.getStations();
      res.status(200).json(stations);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const station = req.body;
      const updatedStation = await this.stationService.updateStation(id, station);
      if (!updatedStation.IStationDTO) {
        res.status(404).json({ message: updatedStation.message });
        return;
      }
      res.status(200).json(updatedStation);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.stationService.deleteStation(id);
      if (result && result.message) {
        res.status(404).json(result);
        return;
      }
      res.status(200).json({ message: 'Estação deletada com sucesso' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const station = await this.stationService.getStationById(id);
      if (!station) {
        res.status(404).json({ message: 'Estação não encontrada' });
        return;
      }
      res.status(200).json(station);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}

export default ReservController;