import { Request, Response } from 'express';
import db from '../database/mysql';

class Estfrn02Controller {
    public async read(req: Request, res: Response): Promise<void> {
        let connection;
        try {
            connection = await db.getConnection();
            const [rows] = await connection.execute('SELECT * FROM Sensor LIMIT 500');
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