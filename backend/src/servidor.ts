import express from 'express';
import { connect } from './database/mongoose';
import { PORT } from './config';
import cors from 'cors';
import Routes from './routes/index';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

connect();

//Essa é a unica rota que deve ser chamada aqui !!!!!!!
app.use('/', Routes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
