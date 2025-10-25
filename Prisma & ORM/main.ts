import {User} from './classes/user';
import {Task} from './classes/task';
import {PrismaClient} from './generated/prisma';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

async function createNewUser(): Promise<User | null> {
    const name = await prompt("Enter user name: ");
    const email = await prompt("Enter user email: ");

    if (!name || !email) {
        console.log("User creation cancelled or invalid input.");
        return null;
    }

    const user = new User(name, email);
    
    // Salvar no banco de dados
    await prisma.user.create({
        data: {
            name: name,
            email: email
        }
    });
    
    console.log(`User created: ${user.getDisplayName()}`);

    return user;
}

async function createNewTask(): Promise<Task | null> {
    const title = await prompt("Enter task title: ");
    const description =  await prompt("Enter task description: ");

    if (!title || !description) {
        console.log("Task creation cancelled or invalid input.");
        return null;
    }

    const task = new Task(title, description);
    
    // Salvar no banco de dados
    await prisma.task.create({
        data: {
            title: title,
            description: description
        }
    });
    
    console.log(`Task created: ${task.showDetails()}`);

    return task;
}

async function listUsers(): Promise<void> {
    console.log("Listing all users...");
    const users = await prisma.user.findMany();
    
    if (users.length === 0) {
        console.log("No users found.");
        return;
    }
    
    users.forEach((user: any) => {
        console.log(`- [${user.id}] ${user.name} <${user.email}>`);
    });
}

async function listTasks(): Promise<void> {
    console.log("Listing all tasks...");
    const tasks = await prisma.task.findMany()

    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }

    tasks.forEach((task: any) => {
        console.log(`- [${task.id}] ${task.title}: ${task.description}`);
    });
}

async function addTaskToUser(): Promise<void> {

    await listUsers();
    const userIdStr = await prompt("Enter user ID to add task to: ");
    const userId = parseInt(userIdStr || "0");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
        console.log("User not found.");
        return;
    }

    console.log(`\nAdding task for user: ${user.name}`);
    const task = await createNewTask();
    
    if (task) {
        console.log(`Task added to user ${user.name}`);
    }
}

async function main(): Promise<void> {

    while (true) {
        console.log("\n=== Task Manager ===");
        console.log("1. Create User");
        console.log("2. Add Task to User");
        console.log("3. List Users");
        console.log("4. List Tasks");
        console.log("5. Exit");

        const choice = await prompt("Choose an option: ");

        switch (choice) {
            case '1':
                await createNewUser();
                break;
            case '2':
                await addTaskToUser();
                break;
            case '3':
                await listUsers();
                break;
            case '4':
                await listTasks();
                break;    
            case '5':            
            case 'exit':
                console.log("Exiting...");
                rl.close();
                await prisma.$disconnect();
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

// Executa a aplicação
main();