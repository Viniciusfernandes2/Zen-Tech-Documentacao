import express from 'express';
import StationRoutes from './routes/StationRoutes';
import ColinasRoutes from './routes/ColinasRoutes';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/AuthRoutes';
import { connect } from './database/mongoose';
import { PORT } from './config';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

connect();

// Suas rotas existentes
app.use('/', AuthRoutes);
app.use('/', UserRoutes);
app.use('/', StationRoutes);
app.use('/', ColinasRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

