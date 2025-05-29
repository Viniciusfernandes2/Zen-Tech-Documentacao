import { Router } from "express";
import sensor from "../controllers/Estfrn02";

const router = Router();

// Única rota para os sensores
router.get('/geral', sensor.read); 
router.get('/maiortemp', sensor.temp); 
router.get('/alerta', sensor.Alert); 

export default router;