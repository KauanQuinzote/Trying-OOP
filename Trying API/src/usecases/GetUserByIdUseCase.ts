import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';

/**
 * Use Case para buscar usuário por ID
 */
export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<User> {
        if (!id) {
            throw new Error('ID é obrigatório');
        }

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }
}