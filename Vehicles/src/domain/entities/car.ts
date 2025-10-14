import { Vehicle, VehicleType } from '../../interfaces/vehicles';
import crypto from 'crypto';

export class Car implements Vehicle {
    public readonly id: string;
    public brand: string;
    public type: VehicleType;
    public name: string;
    public model: string;
    private doorsLocked: boolean = false;
    private engineOn: boolean = false;
    private beltsFastened: boolean = false;

    constructor(brand: string, name: string, model: string) {
        this.id = crypto.randomUUID();
        this.brand = brand;
        this.name = name;
        this.model = model;
        this.type = 'Land'; 
    }

    public getFullName(): string {
        return `${this.brand} ${this.name} ${this.model}`;
    }

    public isType(type: VehicleType): boolean {
        return this.type === type;
    }

    public lockDoors(): void {
        this.doorsLocked = true;
        console.log("Portas trancadas!");
    }

    public unlockDoors(): void {
        this.doorsLocked = false;
        console.log("Portas destrancadas!");
    }

    public startEngine(): void {
        if (!this.doorsLocked) {
            this.engineOn = true;
            console.log("Motor ligado!");
        } else {
            console.log("Trave as portas antes de ligar o motor.");
        }
    }

    public fastenBelts(): void {
        this.beltsFastened = true;
        console.log("Cintos afivelados!");
    }

    public move(): void {
        if (this.engineOn && this.beltsFastened && this.doorsLocked)
            console.log("O carro está se movendo.");
    }
}

