import { Request, Response } from 'express';
import db from '../database/mysql';



//explicação do codigo:
//o metodo read traz um select de todos os dados ordernados em ordem decrescente de data para pegar os ultimos 500 dados
//o metodo temp ordena tambem por data e limita em 1
//o metodo hum traz os ultimos 5 dados de humidade
class Estfrn02Controller {
    public async read(req: Request, res: Response): Promise<void> {
        let connection;
        try {
            connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM Sensor ORDER BY reading_time + 0 DESC LIMIT 500');
            res.json(rows);
        } catch (error) {
            console.error('Erro no controller:', error);
            res.status(500).json({ error: 'Falha ao buscar dados do sensor' });
        } finally {
            if (connection) connection.release(); // Devolve a conexão ao pool
        }
    }

    public async temp(req: Request, res: Response): Promise<void> {
        let connection;
        try {
            connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM Sensor ORDER BY reading_time + 0 DESC LIMIT 10');
            res.json(rows);
        } catch (error) {
            console.error('Erro no controller:', error);
            res.status(500).json({ error: 'Falha ao buscar dados do sensor' });
        } finally {
            if (connection) connection.release(); // Devolve a conexão ao pool
        }
    }
    public async Alert(req: Request, res: Response): Promise<void> {
        let connection;
        try {
            connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM Sensor ORDER BY reading_time + 0 DESC LIMIT 10');
            res.json(rows);
        } catch (error) {
            console.error('Erro no controller:', error);
            res.status(500).json({ error: 'Falha ao buscar dados do sensor' });
        } finally {
            if (connection) connection.release(); // Devolve a conexão ao pool
        }
    }
}

const sensor = new Estfrn02Controller();
export default sensor;