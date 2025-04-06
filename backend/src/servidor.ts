import express from 'express';
import StationRoutes  from './routes/StationRoutes'
import AuthRoutes  from './routes/AuthRoutes'
import UserRoutes  from './routes/AuthRoutes'
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

app.use('/', AuthRoutes);
app.use('/', UserRoutes);
app.use('/', StationRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na pota http://localhost:${PORT}`);
});
