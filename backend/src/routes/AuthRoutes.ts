import { Router } from 'express';
import UserController from '../controllers/UserController';
import { UserRepository } from '../Repository/UserRepository';
import { UserServices } from '../Services/UserServices';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserServices(userRepository);
const userController = new UserController(userService);

router.post('/signup', (req, res) => userController.create(req, res));
router.post('/login', (req, res) => userController.login(req, res));

export default router;