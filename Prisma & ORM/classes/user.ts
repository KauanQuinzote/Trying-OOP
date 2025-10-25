import { Task } from "./task.js";
export class User {
    private static nextId: number = 1;
    
    readonly id: number;
    readonly name: string;
    readonly email: string;

    public tasks: Map<number, Task> = new Map();

    constructor(name: string, email: string) {
        this.id = User.nextId++;
        this.name = name;
        this.email = email;
    }

    getDisplayName(): string {
        return `${this.name} <${this.email}>`;
    }

    getId(): number {
        return this.id;
    }   

    getEmail(): string {
        return this.email;
    }

    addTask(task: Task): void {
        this.tasks.set(task['id'], task);
    }

    listTasks(): void {
        if (this.tasks.size === 0) {
            console.log(`${this.name} has no tasks assigned.`);
            return;
        }

        console.log(`${this.name}'s tasks:`);
        this.tasks.forEach((task) => {
            console.log(`- [${task.getId()}] ${task.getTitle()}`);
        });
    }

    getUserById(id: number): User | null {
        // This is a placeholder. In a real application, you would fetch the user from a database.
        return null;
    }
}