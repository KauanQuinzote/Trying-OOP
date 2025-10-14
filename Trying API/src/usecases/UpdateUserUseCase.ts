import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';

/**
 * DTO para atualização de usuário
 */
export interface UpdateUserDTO {
    name?: string;
    email?: string;
}

/**
 * Use Case para atualizar usuário
 */
export class UpdateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, updateData: UpdateUserDTO): Promise<User> {
        if (!id) {
            throw new Error('ID é obrigatório');
        }

        // Busca usuário existente
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }

        // Se está alterando email, verifica se já existe
        if (updateData.email && updateData.email !== existingUser.email) {
            const emailExists = await this.userRepository.emailExists(updateData.email);
            if (emailExists) {
                throw new Error('Email já está em uso');
            }
        }

        // Cria usuário atualizado
        let updatedUser = existingUser;
        
        if (updateData.name) {
            updatedUser = updatedUser.updateName(updateData.name);
        }
        
        if (updateData.email) {
            updatedUser = updatedUser.updateEmail(updateData.email);
        }

        // Persiste as alterações
        return await this.userRepository.update(updatedUser);
    }
}