import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

export const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/abp';
export const PORT = process.env.PORT || 3006;
export const SECRET = process.env.SECRET || '@TESTE';
