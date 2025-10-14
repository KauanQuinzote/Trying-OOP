import { UserRepository } from '../domain/repositories/UserRepository';

/**
 * Use Case para deletar usuário
 */
export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error('ID é obrigatório');
        }

        // Verifica se usuário existe
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Remove o usuário
        const deleted = await this.userRepository.delete(id);
        if (!deleted) {
            throw new Error('Erro ao deletar usuário');
        }
    }
}