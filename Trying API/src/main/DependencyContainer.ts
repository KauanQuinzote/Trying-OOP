import { InMemoryUserRepository } from '../infrastructure/repositories/InMemoryUserRepository';
import { CreateUserUseCase } from '../usecases/CreateUserUseCase';
import { GetUserByIdUseCase } from '../usecases/GetUserByIdUseCase';
import { ListUsersUseCase } from '../usecases/ListUsersUseCase';
import { UpdateUserUseCase } from '../usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../usecases/DeleteUserUseCase';
import { UserController } from '../presentation/controllers/UserController';

/**
 * Factory para composição das dependências
 * Aqui é onde fazemos a injeção de dependência manualmente
 */
export class DependencyContainer {
    // Repositories
    private userRepository = new InMemoryUserRepository();

    // Use Cases
    private createUserUseCase = new CreateUserUseCase(this.userRepository);
    private getUserByIdUseCase = new GetUserByIdUseCase(this.userRepository);
    private listUsersUseCase = new ListUsersUseCase(this.userRepository);
    private updateUserUseCase = new UpdateUserUseCase(this.userRepository);
    private deleteUserUseCase = new DeleteUserUseCase(this.userRepository);

    // Controllers
    public getUserController(): UserController {
        return new UserController(
            this.createUserUseCase,
            this.getUserByIdUseCase,
            this.listUsersUseCase,
            this.updateUserUseCase,
            this.deleteUserUseCase
        );
    }

    // Método para acessar repositório (útil para testes ou setup inicial)
    public getUserRepository(): InMemoryUserRepository {
        return this.userRepository;
    }
}