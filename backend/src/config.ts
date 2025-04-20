import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da raiz do projeto
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

export const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/abp';
export const PORT = process.env.PORT || 3006;
export const SECRET = process.env.SECRET || '@TESTE';


//CRIEM UM ARQUIVO .ENV E COLOQUEM AS VARIAVEIS ABAIXO:
// DATABASE_URI='mongodb://localhost:27017/abp'
//PORT: 3006
//SECRET: '@TESTE'

//TESTE SE ESSE ARQUIVO .CONFIG ESTA FUNCIONANDO NO PC DE VOCES
// console.log('DATABASE_URI:', DATABASE_URI); // Isso está funcionando
