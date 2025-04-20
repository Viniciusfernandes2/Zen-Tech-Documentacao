import UserRoutes from "./AuthRoutes";
import AuthRoutes from "./AuthRoutes";
import ColinasRoutes from "./ColinasRoutes";
import ReservRoutes from "./ReseveRoutes";
import { Router } from 'express';
const router = Router();

router.use('/', AuthRoutes);
router.use('/', UserRoutes);
router.use('/', UserRoutes);
router.use('/', ColinasRoutes);
router.use('/', ReservRoutes)

export default router;