const express = require('express');
const bodyParser = require('body-parser');
const exemploRouter = require('./routes/exemplo');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api/exemplo', exemploRouter);

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo ao meu app Express!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});