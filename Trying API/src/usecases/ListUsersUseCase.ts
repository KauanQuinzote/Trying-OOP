import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';

/**
 * Use Case para listar todos os usuários
 */
export class ListUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}