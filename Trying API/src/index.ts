import express, { Application, Request, Response } from 'express';
import { DependencyContainer } from './main/DependencyContainer';
import { createUserRoutes } from './presentation/routes/userRoutes';

/**
 * Servidor principal aplicando Clean Architecture
 */
class Server {
    private app: Application;
    private port: number;
    private container: DependencyContainer;

    constructor(port: number = 3000) {
        this.app = express();
        this.port = port;
        this.container = new DependencyContainer();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private setupRoutes(): void {
        // Rota de status da aplicação
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                message: 'Clean Architecture API com TypeScript Node.js!',
                version: '1.0.0',
                architecture: 'Clean Architecture',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development',
                endpoints: {
                    users: '/api/users',
                    health: '/api/health'
                }
            });
        });

        // Rota de health check
        this.app.get('/api/health', (req: Request, res: Response) => {
            res.json({
                status: 'OK',
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                timestamp: new Date().toISOString()
            });
        });

        // Rotas de usuários usando Clean Architecture
        const userController = this.container.getUserController();
        this.app.use('/api/users', createUserRoutes(userController));
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on port ${this.port}`);
            console.log(`🏗️  Architecture: Clean Architecture`);
            console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 URL: http://localhost:${this.port}`);
            console.log(`📚 API Documentation:`);
            console.log(`   GET    /               - API Info`);
            console.log(`   GET    /api/health     - Health Check`);
            console.log(`   GET    /api/users      - List Users`);
            console.log(`   POST   /api/users      - Create User`);
            console.log(`   GET    /api/users/:id  - Get User`);
            console.log(`   PUT    /api/users/:id  - Update User`);
            console.log(`   DELETE /api/users/:id  - Delete User`);
        });
    }

    public getApp(): Application {
        return this.app;
    }

    public getContainer(): DependencyContainer {
        return this.container;
    }
}

// Instanciar e iniciar o servidor
const server = new Server();
server.start();