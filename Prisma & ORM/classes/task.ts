export class Task {
    private id: number = 0;
    title: string;
    description: string;
    completed: boolean = false;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }

    showDetails(): string {
        return `Task ID: ${this.id}\nTitle: ${this.title}\nDescription: ${this.description}\nCompleted: ${this.completed}`;
    }
    getDescription(): string {
        return this.description;
    }

    assignID(id: number): void {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }
}
