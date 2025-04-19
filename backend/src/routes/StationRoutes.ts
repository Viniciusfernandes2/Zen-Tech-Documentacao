import { Router } from 'express';
import StationController from '../controllers/StationController';
import { StationRepository } from '../Repository/StationRepository';
import { StationService } from '../Services/StationServices';

const router = Router();

const stationRepository = new StationRepository();
const stationService = new StationService(stationRepository);
const stationController = new StationController(stationService);

router.post('/stations', (req, res) => stationController.create(req, res));
router.get('/stations', (req, res) => stationController.read(req, res));
router.put('/stations/:id', (req, res) => stationController.update(req, res));
router.delete('/stations/:id', (req, res) => stationController.delete(req, res));
router.get('/stations/:id', (req, res) => stationController.findById(req, res));

export default router;