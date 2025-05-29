import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env da raiz do projeto
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// export const DATABASE_URI = ;
export const PORT = 3006;
export const SECRET = "@TESTE"
export const DATABASE_URI = "mongodb://localhost:27017/"
// console.log('DATABASE_URI:', DATABASE_URI); // Isso está funcionando