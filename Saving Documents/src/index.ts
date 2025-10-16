import http from 'http';

const PORT = process.env.PORT || 3000;

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => void;

const requestHandler: RequestHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Projeto Node (TypeScript) iniciado com sucesso!' }));
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export { server };
