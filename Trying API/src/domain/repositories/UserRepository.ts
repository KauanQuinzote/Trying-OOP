import { User } from '../entities/User';

/**
 * Interface do Repository para User
 * Define o contrato para operações de persistência
 * Esta é uma interface do domínio - não conhece implementações específicas
 */
export interface UserRepository {
    /**
     * Salva um usuário
     */
    save(user: User): Promise<User>;

    /**
     * Busca usuário por ID
     */
    findById(id: string): Promise<User | null>;

    /**
     * Busca usuário por email
     */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Lista todos os usuários
     */
    findAll(): Promise<User[]>;

    /**
     * Atualiza um usuário
     */
    update(user: User): Promise<User>;

    /**
     * Remove um usuário por ID
     */
    delete(id: string): Promise<boolean>;

    /**
     * Verifica se email já existe
     */
    emailExists(email: string): Promise<boolean>;
}