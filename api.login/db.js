const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'login',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Conexão com MySQL funcionando!");
  } catch (err) {
    console.error("Erro ao conectar no MySQL:", err);
  }
})();

module.exports = pool;
