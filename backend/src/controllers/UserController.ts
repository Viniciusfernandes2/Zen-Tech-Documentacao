import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { IUserRepository } from '../Repository/interfaces/IUserRepository';

class UserController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.setHeader('Authorization', `${token}`);
      res.status(200).json({ message: 'Usuario logado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login', error });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role, numero } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await this.userRepository.create({
        name,
        email,
        password: passwordHash,
        role,
        numero,
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const mensagens = Object.values(error.errors).map(
          (err: any) => err.message
        );
        res
          .status(400)
          .json({ message: 'Erro ao criar usuário', errors: mensagens });
      }
    }
  }

  public async read(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userRepository.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter usuários', error });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { name, email, password } = req.body;
      const update = await this.userRepository.updateOne(id, {
        name,
        email,
        password,
      });
      res.json(update);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findByIdAndDelete(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
  }
}

export default UserController;
