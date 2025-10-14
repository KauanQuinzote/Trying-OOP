import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';

/**
 * DTO para criação de usuário
 */
export interface CreateUserDTO {
    name: string;
    email: string;
}

/**
 * Use Case para criar um novo usuário
 * Contém a regra de negócio para criação de usuários
 */
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userData: CreateUserDTO): Promise<User> {
        // Regra de negócio: Email deve ser único
        const emailExists = await this.userRepository.emailExists(userData.email);
        if (emailExists) {
            throw new Error('Email já está em uso');
        }

        // Gera um ID único (em produção, usar UUID)
        const id = this.generateId();

        // Cria a entidade User (que valida os dados internamente)
        const user = new User(id, userData.name, userData.email);

        // Persiste o usuário
        return await this.userRepository.save(user);
    }

    private generateId(): string {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
}