import {Router} from "express";
import user from "../controllers/UserController"
import { auth } from "../middlewares/AuthMiddleware";
const router = Router();

router.get('/users',auth, user.read);
router.put('/users/:id',auth, user.update);
router.delete('/users/:id',auth, user.delete);

export default router;