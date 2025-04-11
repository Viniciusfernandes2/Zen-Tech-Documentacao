import { Router } from "express";
import colinasController from "../controllers/ColinasController";

const router = Router();

router.post('/signup', colinasController.create);
router.get('/colinas', colinasController.read);
router.put('/colinas/:id', colinasController.update);
router.delete('/colinas/:id', colinasController.delete);

export default router;