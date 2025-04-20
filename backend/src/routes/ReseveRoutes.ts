import { Router } from 'express';
import ReservController from '../controllers/ReservController';
import { ReserveRepository } from '../Repository/ReserveRepository';
import { ReserveService } from '../Services/ReserveService';

const router = Router();

const stationRepository = new ReserveRepository();
const stationService = new ReserveService(stationRepository);
const stationController = new ReservController(stationService);

router.post('/stations', (req, res) => stationController.create(req, res));
router.get('/stations', (req, res) => stationController.read(req, res));
router.put('/stations/:id', (req, res) => stationController.update(req, res));
router.delete('/stations/:id', (req, res) => stationController.delete(req, res));
router.get('/stations/:id', (req, res) => stationController.findById(req, res));

export default router;