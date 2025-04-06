import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET } from "../config";


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ message: "Token not provided" });
            return;
        }
        const [, token] = authorization.split(" ");
        try {
            jwt.verify(token, SECRET);
            console.log('Usuario autenticado')
            next();
        } catch (error) {
            res.status(401).json(  { message: "Token expired" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao autenticar', error });
    }
}
