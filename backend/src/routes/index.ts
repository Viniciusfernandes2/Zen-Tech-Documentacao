import UserRoutes from "./AuthRoutes";
import AuthRoutes from "./AuthRoutes";
import ColinasRoutes from "./ColinasRoutes";
import Estfn02Router from "./Estfn02Router";
import ReservRoutes from "./ReservRoutes";
import {Router} from "express"
const router = Router();

router.use('/', AuthRoutes);
router.use('/', UserRoutes);
router.use('/', ReservRoutes);
router.use('/', ColinasRoutes);
router.use('/', Estfn02Router);

export default router;