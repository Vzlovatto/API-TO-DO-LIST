const http = require('http');

// Importa
const taskRoute = require('./routes/taskRoute');

// Cria servidor
const server = http.createServer((req, res) => {

  // Define cabeçalho JSON
  res.setHeader('Content-Type', 'application/json');

  // Chama o roteador
  taskRoute(req, res);
});

// Porta
const PORT = 3000;

// Inicia servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
