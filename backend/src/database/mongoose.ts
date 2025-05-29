import mongoose from "mongoose";
import {DATABASE_URI} from '../config';

export const connect = async () => {
    try {
        await mongoose.connect(DATABASE_URI)
        console.log('Conectado ao MongoDB com sucesso');
    }
    catch (err) {
        console.log(err,'Erro ao conectar com mongodb!');
        throw new Error('Erro interno no servidor');
    }
}