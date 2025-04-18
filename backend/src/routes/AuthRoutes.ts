import { Router } from 'express';
import UserController from '../controllers/UserController';
import { UserRepository } from '../Repository/UserRepository';

const router = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.post('/signup', (req, res) => userController.create(req, res));
router.post('/login', (req, res) => userController.login(req, res));

export default router;