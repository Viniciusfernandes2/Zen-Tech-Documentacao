import UserRoutes from "./AuthRoutes";
import AuthRoutes from "./AuthRoutes";
import ColinasRoutes from "./ColinasRoutes";
import ReservRoutes from "./ResevRoutes";
import {Router} from 'express';
const router = Router();

//NÃO COLOCAR NADA DE CAMINHO NAS ROTAS AKI, APENAS O NOME DO ARQUIVO
router.use('/', AuthRoutes);
router.use('/', UserRoutes);
router.use('/', UserRoutes);
router.use('/', ColinasRoutes);
router.use('/',ReservRoutes)

export default router;