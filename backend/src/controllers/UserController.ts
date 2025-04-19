import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserServices } from '../Services/UserServices';

class UserController {
  private readonly userService: UserServices;

  constructor(userService: UserServices) {
    this.userService = userService;
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userResponse = await this.userService.login(email, password);

      if (!userResponse || !userResponse.user) {
        res.status(401).json({ message: userResponse?.message || 'Erro ao fazer login' });
        return;
      }

      const token = jwt.sign({ id: userResponse.user.id }, SECRET, { expiresIn: '1h' });

      res.setHeader('Authorization', `${token}`);
      res.status(200).json({ message: userResponse.message, token });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login', error });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role, numero } = req.body;
      const userResponse = await this.userService.createUser({ name, email, password, role, numero });

      res.status(201).json({ message: userResponse.message, user: userResponse.user });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const mensagens = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({ message: 'Erro ao criar usuário', errors: mensagens });
      } else {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
      }
    }
  }

  public async read(req: Request, res: Response): Promise<void> {
    try {
      const usersResponse = await this.userService.getUsers();
      res.status(200).json(usersResponse);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter usuários', error });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userData = req.body;
      const userResponse = await this.userService.updateUser(id, userData);

      if (!userResponse.user) {
        res.status(404).json({ message: userResponse.message });
        return;
      }

      res.status(200).json({ message: userResponse.message, user: userResponse.user });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const deleteResponse = await this.userService.deleteUser(id);

      if (deleteResponse.message === 'Usuário não encontrado.') {
        res.status(404).json(deleteResponse);
        return;
      }

      res.status(200).json(deleteResponse);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const userResponse = await this.userService.getUserById(id);

      if (!userResponse.user) {
        res.status(404).json({ message: userResponse.message });
        return;
      }

      res.status(200).json({ message: userResponse.message, user: userResponse.user });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter usuário', error });
    }
  }
}

export default UserController;