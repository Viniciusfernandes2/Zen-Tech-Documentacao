import { Router } from "express";
import stationController from "../controllers/StationController";

const router = Router();

router.post('/station', stationController.create);
router.get('/station', stationController.read);
router.put('/station/:id', stationController.update);
router.delete('/station/:id', stationController.delete);

export default router;