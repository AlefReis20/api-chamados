import express from 'express';
import dotenv from 'dotenv';
import pool from './db/connect.js';
import ticketRoutes from './routes/ticketRoutes.js';

//Carrega variaveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3007;

//Midleware de leitura JSON
app.use(express.json());

//Teste de conexão com o banco
app.get('/', async (req, res) => {
  res.send('API de chamados com ESModules no ar!');
});

//Usar as rotas dos chamados
app.use('/api/chamados', ticketRoutes);

//Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
