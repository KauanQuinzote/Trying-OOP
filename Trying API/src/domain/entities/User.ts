/**
 * User Entity - Representa um usuário no domínio da aplicação
 * Esta é uma entidade de domínio pura, sem dependências externas
 */
export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor(
        id: string,
        name: string,
        email: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.validateName(name);
        this.validateEmail(email);

        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    /**
     * Valida se o nome é válido
     */
    private validateName(name: string): void {
        if (!name || name.trim().length < 2) {
            throw new Error('Nome deve ter pelo menos 2 caracteres');
        }
    }

    /**
     * Valida se o email é válido (regex simples)
     */
    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error('Email deve ter um formato válido');
        }
    }

    /**
     * Cria uma nova versão do usuário com nome atualizado
     */
    public updateName(newName: string): User {
        return new User(
            this.id,
            newName,
            this.email,
            this.createdAt,
            new Date()
        );
    }

    /**
     * Cria uma nova versão do usuário com email atualizado
     */
    public updateEmail(newEmail: string): User {
        return new User(
            this.id,
            this.name,
            newEmail,
            this.createdAt,
            new Date()
        );
    }

    /**
     * Converte para objeto simples (útil para serialização)
     */
    public toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}