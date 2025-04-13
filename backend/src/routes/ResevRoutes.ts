import { Router } from "express";
import reservController from "../controllers/ReservController";

const router = Router();

router.post('/signup', reservController.create); 
router.get('/station', reservController.read);   //vou deixar /station para nao precisar alterar no front , depois temos que trocar
router.put('/station/:id', reservController.update);
router.delete('/station/:id', reservController.delete);

export default router;