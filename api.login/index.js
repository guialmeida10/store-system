const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const loginRouter = require('./routes/login');
const produtosRouter = require('./routes/produtos');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/auth', loginRouter);
app.use('/produtos', produtosRouter);

// Servir o React
app.use(express.static(path.join(__dirname, 'dist')));

// Rota para testar API
app.get('/api-test', (req, res) => res.send('API rodando com sucesso!'));

// Todas as outras rotas → React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

