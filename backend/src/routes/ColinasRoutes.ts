import { Router } from 'express';
import ColinasController from '../controllers/ColinasController';
import { ColinasRepository } from '../Repository/ColinasRepository';
import { ColinasServices } from '../Services/ColinasServices';
import { auth } from '../middlewares/AuthMiddleware';

const router = Router();

const colinasRepository = new ColinasRepository();
const colinasService = new ColinasServices(colinasRepository);
const colinasController = new ColinasController(colinasService);

router.post('/colinas', auth, (req, res) => colinasController.create(req, res));
router.get('/colinas', auth, (req, res) => colinasController.read(req, res));
router.put('/colinas/:id', auth, (req, res) => colinasController.update(req, res));
router.delete('/colinas/:id', auth, (req, res) => colinasController.delete(req, res));

export default router;
