import { Vehicle, VehicleType } from '../../interfaces/vehicles';
import crypto from 'crypto';

export class Plane implements Vehicle {
    public readonly id: string;
    public brand: string;
    public type: VehicleType;
    public name: string;
    public model: string;
    private landingGearDeployed: boolean = true;
    private enginesOn: boolean = false;
    private seatbeltsFastened: boolean = false;
    private doorsLocked: boolean = false;

    constructor(brand: string, name: string, model: string) {
        this.id = crypto.randomUUID();
        this.brand = brand;
        this.name = name;
        this.model = model;
        this.type = 'Aerial'; 
    }

    public getFullName(): string {
        return `${this.brand} ${this.name} ${this.model}`;
    }

    public isType(type: VehicleType): boolean {
        return this.type === type;
    }

    public deployLandingGear(): void {
        this.landingGearDeployed = true;
        console.log("Trem de pouso acionado!");
    }

    public retractLandingGear(): void {
        this.landingGearDeployed = false;
        console.log("Trem de pouso recolhido!");
    }

    public startEngine(): void {
        if (!this.doorsLocked) {
            this.enginesOn = true;
            console.log("Motores acionados!");
        } else {
            console.log("Tranque as portas antes de ligar os motores.");
        }
    }

    public fastenBelts(): void {
        this.seatbeltsFastened = true;
        console.log("Cintos afivelados!");
    }

    public lockDoors(): void {
        this.doorsLocked = true;
        console.log("Portas trancadas!");
    }

    public unlockDoors(): void {
        this.doorsLocked = false;
        console.log("Portas destrancadas!");
    }
    
    public move(): void {
        if (this.enginesOn && this.seatbeltsFastened && !this.landingGearDeployed && this.doorsLocked)
            console.log("O avião está voando.");
        else
            console.log("Não é possível voar. Verifique os sistemas.");
    }
}
