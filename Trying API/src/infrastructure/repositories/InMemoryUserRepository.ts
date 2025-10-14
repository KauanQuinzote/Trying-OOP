import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

/**
 * Implementação em memória do UserRepository
 * Em produção, seria substituída por implementação com banco de dados
 */
export class InMemoryUserRepository implements UserRepository {
    private users: Map<string, User> = new Map();

    async save(user: User): Promise<User> {
        this.users.set(user.id, user);
        return user;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.get(id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        return Array.from(this.users.values());
    }

    async update(user: User): Promise<User> {
        this.users.set(user.id, user);
        return user;
    }

    async delete(id: string): Promise<boolean> {
        return this.users.delete(id);
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return user !== null;
    }

    // Método auxiliar para limpar dados (útil para testes)
    clear(): void {
        this.users.clear();
    }

    // Método auxiliar para obter total de usuários
    count(): number {
        return this.users.size;
    }
}