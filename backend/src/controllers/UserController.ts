import { Request, Response } from "express";
import { User } from "../models/UserScheme";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from "../config";

class UserController {

public async login(req: Request, res: Response, next: any):Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
        res.setHeader("Authorization",`${token}`);
        // res.json({email,password});
        res.status(200).json({ message: "Usuario logado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
}


    public async create(req: Request, res: Response):Promise<void> {
        try {
            const { name, email, password,role,numero } = req.body;
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: passwordHash ,role,numero});
            await newUser.save();
            res.status(201).json(newUser);
            //res.status(201).json('Usuario criado com sucesso!');
        } catch (error:any) {
            if (error.name === "ValidationError") {
                const mensagens = Object.values(error.errors).map((err: any) => err.message);
                 res.status(400).json({ message: "Erro ao criar usuário", errors: mensagens });
              }
        }
    }
    public async read(req: Request, res: Response):Promise<void> {
        try {
            const users = await User.find();
            res.json(users); 
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuários', error });
        }
    }

    public async update(req: Request, res: Response):Promise<void> {
        try {
            const id = req.params.id;
            const { name, email, password } = req.body;
            const update = await User.updateOne({ _id: id }, { name, email, password });
            res.json(update);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter usuários', error });
        }
    }

    public async delete(req: Request, res: Response):Promise<void> {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário', error });
        }
    }

}
const user = new UserController();
export default user;
