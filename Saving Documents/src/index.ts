import express from 'express';
import { DocumentController } from './controllers/documentController';
import { InMemoryDocumentRepository } from './repositories/inMemoryDocumentRepository';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS para desenvolvimento (permite Vite na porta 5173 chamar API na porta 3000)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Composition Root - Injeção de dependências
const documentRepository = new InMemoryDocumentRepository();
const documentController = new DocumentController(documentRepository);

// Rotas da API
app.post('/api/documents', (req, res) => documentController.create(req, res));
app.get('/api/documents', (req, res) => documentController.list(req, res));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend API rodando em http://localhost:${PORT}`);
  console.log(`� API Endpoints: http://localhost:${PORT}/api/documents`);
  console.log(`� Frontend: Execute 'npm run dev:frontend' em outro terminal`);
});

export { app };
