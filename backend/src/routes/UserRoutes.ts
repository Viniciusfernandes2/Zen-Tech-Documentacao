import express from 'express';
import UserController from '../controllers/UserController';
import { UserRepository } from '../Repository/UserRepository';
import { UserServices } from '../Services/UserServices';

const app = express();
app.use(express.json());

const userRepository = new UserRepository();
const userService = new UserServices(userRepository);
const userController = new UserController(userService);

app.post('/users/login', (req, res) => userController.login(req, res));
app.post('/users', (req, res) => userController.create(req, res));
app.get('/users', (req, res) => userController.read(req, res));
app.put('/users/:id', (req, res) => userController.update(req, res));
app.delete('/users/:id', (req, res) => userController.delete(req, res));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
