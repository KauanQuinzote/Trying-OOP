import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import * as fs from 'fs/promises';

/**
 * Implementação do UserRepository usando arquivo JSON
 * Demonstra como a mesma interface pode ter implementações diferentes
 */
export class FileUserRepository implements UserRepository {
    private filePath: string;

    constructor(filePath: string = './users.json') {
        this.filePath = filePath;
    }

    async save(user: User): Promise<User> {
        const users = await this.loadUsers();
        users[user.id] = user.toJSON();
        await this.saveUsers(users);
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const users = await this.loadUsers();
        const userData = users[id];
        
        if (!userData) return null;
        
        return new User(
            userData.id,
            userData.name,
            userData.email,
            new Date(userData.createdAt),
            new Date(userData.updatedAt)
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const users = await this.loadUsers();
        
        for (const userData of Object.values(users)) {
            if ((userData as any).email === email) {
                const user = userData as any;
                return new User(
                    user.id,
                    user.name,
                    user.email,
                    new Date(user.createdAt),
                    new Date(user.updatedAt)
                );
            }
        }
        
        return null;
    }

    async findAll(): Promise<User[]> {
        const users = await this.loadUsers();
        return Object.values(users).map((userData: any) => 
            new User(
                userData.id,
                userData.name,
                userData.email,
                new Date(userData.createdAt),
                new Date(userData.updatedAt)
            )
        );
    }

    async update(user: User): Promise<User> {
        return await this.save(user); // Mesmo que save neste caso
    }

    async delete(id: string): Promise<boolean> {
        const users = await this.loadUsers();
        if (users[id]) {
            delete users[id];
            await this.saveUsers(users);
            return true;
        }
        return false;
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return user !== null;
    }

    // Métodos privados para manipular arquivo
    private async loadUsers(): Promise<any> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Se arquivo não existe, retorna objeto vazio
            return {};
        }
    }

    private async saveUsers(users: any): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(users, null, 2));
    }
}