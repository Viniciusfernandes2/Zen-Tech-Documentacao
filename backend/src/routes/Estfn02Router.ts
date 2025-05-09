import { Router } from "express";
import sensor from "../controllers/Estfrn02";

const router = Router();

// Única rota para os sensores
router.get('/sensor', sensor.read); 

export default router;