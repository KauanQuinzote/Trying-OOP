import { Router } from 'express';
import { UserController } from '../controllers/UserController';

/**
 * Configuração das rotas de usuário
 */
export function createUserRoutes(userController: UserController): Router {
    const router = Router();

    // POST /users - Criar usuário
    router.post('/', (req, res) => userController.create(req, res));

    // GET /users - Listar usuários
    router.get('/', (req, res) => userController.list(req, res));

    // GET /users/:id - Buscar usuário por ID
    router.get('/:id', (req, res) => userController.getById(req, res));

    // PUT /users/:id - Atualizar usuário
    router.put('/:id', (req, res) => userController.update(req, res));

    // DELETE /users/:id - Deletar usuário
    router.delete('/:id', (req, res) => userController.delete(req, res));

    return router;
}