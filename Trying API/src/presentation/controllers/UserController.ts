import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../usecases/CreateUserUseCase';
import { GetUserByIdUseCase } from '../../usecases/GetUserByIdUseCase';
import { ListUsersUseCase } from '../../usecases/ListUsersUseCase';
import { UpdateUserUseCase } from '../../usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../usecases/DeleteUserUseCase';

/**
 * Controller para operações de usuário
 * Responsável por receber requisições HTTP e chamar os Use Cases apropriados
 */
export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private listUsersUseCase: ListUsersUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    /**
     * POST /users - Criar novo usuário
     */
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                res.status(400).json({
                    error: 'Nome e email são obrigatórios'
                });
                return;
            }

            const user = await this.createUserUseCase.execute({ name, email });
            
            res.status(201).json({
                success: true,
                data: user.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    /**
     * GET /users/:id - Buscar usuário por ID
     */
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.getUserByIdUseCase.execute(id);
            
            res.status(200).json({
                success: true,
                data: user.toJSON()
            });
        } catch (error) {
            const statusCode = error instanceof Error && error.message === 'Usuário não encontrado' ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    /**
     * GET /users - Listar todos os usuários
     */
    async list(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.listUsersUseCase.execute();
            
            res.status(200).json({
                success: true,
                data: users.map(user => user.toJSON()),
                total: users.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    /**
     * PUT /users/:id - Atualizar usuário
     */
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const user = await this.updateUserUseCase.execute(id, { name, email });
            
            res.status(200).json({
                success: true,
                data: user.toJSON()
            });
        } catch (error) {
            const statusCode = error instanceof Error && error.message === 'Usuário não encontrado' ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    /**
     * DELETE /users/:id - Deletar usuário
     */
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.deleteUserUseCase.execute(id);
            
            res.status(200).json({
                success: true,
                message: 'Usuário deletado com sucesso'
            });
        } catch (error) {
            const statusCode = error instanceof Error && error.message === 'Usuário não encontrado' ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
}