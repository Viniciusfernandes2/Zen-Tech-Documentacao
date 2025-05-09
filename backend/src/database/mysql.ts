import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'hydrosmart-iot.com',
    user: 'hydros28',
    password: 'A9302pbycW',
    database: 'hydros28_estfrn02',
    waitForConnections: true,
    connectionLimit: 10, // Ajuste conforme necessário
});

export default pool;