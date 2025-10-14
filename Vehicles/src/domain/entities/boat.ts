import { Vehicle, VehicleType } from '../../interfaces/vehicles';
import crypto from 'crypto';


export class Boat implements Vehicle {
    public readonly id: string;
    public brand: string;
    public type: VehicleType;
    public name: string;
    public model: string;
    private anchorRaised: boolean = false;

    constructor(brand: string, name: string, model: string) {
        this.id = crypto.randomUUID();
        this.brand = brand;
        this.name = name;
        this.model = model;
        this.type = 'Water'; 
    }

    public getFullName(): string {
        return `${this.brand} ${this.name} ${this.model}`;
    }

    public isType(type: VehicleType): boolean {
        return this.type === type;
    }

    public raiseAnchor(): void {
        this.anchorRaised = true;
        console.log("Âncora levantada!");
    }

    public lowerAnchor(): void {
        this.anchorRaised = false;
        console.log("Âncora abaixada!");
    }   

    public move(): void {
        if (this.anchorRaised)
            console.log("O barco está se movendo.");
        else
            console.log("Levante a âncora antes de mover o barco.");
    }

    public lockDoors(): void {
        console.log("Barcos não possuem portas para trancar.");
    }

    public fastenBelts(): void {
        console.log("Barcos não possuem cintos de segurança para afivelar.");
    }

    public startEngine(): void {
        console.log("O motor do barco foi ligado!");
    }
}
